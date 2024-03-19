import React, { useState, useEffect, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";
import { create } from "ipfs-http-client";

// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const projectId = "2QBXoJvcUnuqsVscbM6eW2BNGUn";



const projectSecretKey = "0294bfcad9faff05ffd1b2b0b88856ce";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
	"base64"
)}`;

const subdomain = "https://shiba-nft.infura-ipfs.io";

const client = create({
	host: 'ipfs.infura.io',
	port: 5001,
	protocol: 'https',
	headers: {
		authorization: auth,
	},
});

// INTERNAL IMPORT
import {
	NFTMarketplaceAddress, nftMarketplaceABI,
	TransferFundsAddress, TransferFundsABI
} from "./Constants";
// FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
	new ethers.Contract(
		NFTMarketplaceAddress,
		nftMarketplaceABI,
		signerOrProvider
	);

// TRANSFER FUNDS

const fetchTransferFundsContract = (signerOrProvider) =>
	new ethers.Contract(
		TransferFundsAddress,
		TransferFundsABI,
		signerOrProvider
	);


const connectToTransferFunds = async () => {
	try {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const contract = fetchTransferFundsContract(signer);

		return contract;

	} catch (error) {
		console.log("error while buying NFTs");
	}
};

// --CONNECTING WITH SMART CONTRACT --
const connectingWithSmartContract = async () => {
	try {
		const web3Modal = new Web3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();
		const contract = fetchContract(signer);
		return contract;
	} catch (error) {
		console.log("Something went wrong");
	}
};




export const NFTMarketplaceContext = React.createContext();


export const NFTMarketplaceProvider = ({ children }) => {
	const titleData = "Discover, collect, and sell NFTs";

	// USE STATE
	const [currentAccount, setCurrentAccount] = useState("");
	const [accountBalance, setAccountBalance] = useState("");
	const [nfts, setNfts] = useState([]);

	const router = useRouter();
	// CHECK IF WALLET IS CONNECTED
	const checkIfWalletIsConnected = async () => {
		try {
			if (!window.ethereum) return console.log("Install MetaMask");

			const accounts = await window.ethereum.request({
				method: "eth_accounts",
			});

			if (accounts.length) {
				setCurrentAccount(accounts[0]);
			} else {
				console.log("No Account Found");
			}


			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const getBalance = await provider.getBalance(accounts[0]);
			setAccountBalance(ethers.utils.formatEther(getBalance));
			console.log(ethers.utils.formatEther(getBalance));

		} catch (error) {
			console.log("Something wrong while connecting to wallet");
		}
	};

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);
	// Connection Wallet Function
	const connectWallet = async () => {
		try {
			if (!window.ethereum) return console.log("Install MetaMask");

			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});

			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log("Something wrong while connecting to wallet");
		}
	};

	// UPLOAD to ipfs function
	const uploadToIPFS = async (file) => {
		try {
			const added = await client.add({ content: file });
			const url = `${subdomain}/ipfs/${added.path}`;

			console.log(url);

			return url;
		} catch (error) {
			console.log("Error uploading to ipfs: ", error);
		}
	};


	// CREATENFT FUNCTION
	const createNFT = async (name, price, image, description) => {


		if (!name || !price || !image || !description) {
			console.log("data is missing");
		}

		const data = JSON.stringify({
			name,
			// price,
			image,
			description,
		})

		try {
			const added = await client.add(data);

			const url = `https://shiba-nft.infura-ipfs.io/ipfs/${added.path}`;
			// const url = `https://ipfs.io/ipfs/${added.path}`;

			await createSale(url, price);
		} catch (error) {
			console.log(error);
		}
	};

	const createSale = async (url, formInputPrice, isReselling, id) => {
		try {
			console.log("Start createSale");

			const price = ethers.utils.parseUnits(formInputPrice, "ether");
			const contract = await connectingWithSmartContract();

			if (!contract) {
				throw new Error("Smart contract not initialized");
			}

			console.log("Connected to smart contract");

			const listingPrice = await contract.getListingPrice();

			console.log("Listing price:", listingPrice.toString());

			const transaction = !isReselling
				? await contract.createToken(url, price, {
					value: listingPrice.toString(),
				})
				: await contract.reSellToken(url, price, {
					value: listingPrice.toString(),
				});

			console.log("Transaction sent");

			await transaction.wait();

			console.log("Transaction mined:", transaction);

			router.push('/searchPage');
		} catch (error) {
			console.error("Error while creating sale:", error.message);
		}
	};

	// FETCHNFTS FUNCTION

	const fetchNFTs = async () => {
		try {

			const provider = new ethers.providers.JsonRpcBatchProvider();
			const contract = fetchContract(provider);

			const data = await contract.fetchMarketItem();

			console.log(data);


			const items = await Promise.all(
				data.map(
					async ({ tokenId, seller, owner, price: unformattedPrice }) => {
						const tokenURI = await contract.tokenURI(tokenId);

						const {
							data: { image, name, description },
						} = await axios.get(tokenURI);
						const price = ethers.utils.formatUnits(
							unformattedPrice.toString(),
							"ether"
						);
						return {
							price,
							tokenId: tokenId.toNumber(),
							seller,
							owner,
							image,
							name,
							description,
							tokenURI

						};
					}
				)
			);

			setNfts(items);

			console.log(items);
			return items;
		} catch (error) {
			console.log("error while fetching NFTs", error);
		}
	};

	useEffect(() => {
		fetchNFTs();
	}, []);

	// FETCHING MY NFT OR LISTED NFT

	const fetchMyNFTsOrListedNFTs = async (type) => {
		try {
			const contract = await connectingWithSmartContract();

			const data = type == "fetchItemsListed" ? await contract.fetchItemsListed() : await contract.fetchMyNFTs();

			const items = await Promise.all(
				data.map(
					async ({ tokenId, seller, owner, price: unformattedPrice }) => {
						const tokenURI = await contract.tokenURI(tokenId);
						const {
							data: { image, name, description },
						} = await axios.get(tokenURI);
						const price = ethers.utils.formatUnits(
							unformattedPrice.toString(),
							"ether"
						);
						return {
							price,
							tokenId: tokenId.toNumber(),
							seller,
							owner,
							image,
							name,
							description,
							tokenURI,
						};
					}
				)
			)

		} catch (error) {
			console.log("error while fetching NFTs");
		}

	}

	// --  BUY NFTS FUNCTION
	const buyNFT = async (nft) => {
		try {
			const contract = await connectingWithSmartContract();
			const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
			const transaction = await contract.createMarketSale(nft.tokenId, {
				value: price,
			});

			await transaction.wait();

		} catch (error) {
			console.log("error while buying NFTs");
		}
	};

	// TRANSFER FUNDS 
	const [transactionCount, setTransactionCount] = useState('');
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(false);

	const transferEther = async (address, ether, message) => {
		try {
			if (currentAccount) {
				const contract = await connectToTransferFunds();
				console.log(address, ether, message);

				const unformattedPrice = ethers.utils.parseEther(ether);
				// FIRST METHOD TO TRANSFER FUNDS
				await ethereum.request({
					method: 'eth_sendTransaction',
					params: [{
						from: currentAccount,
						to: address,
						gas: "0x5208",
						value: unformattedPrice._hex
					}]
				});

				const transaction = await contract.addDataToBlockchain(address, unformattedPrice, message);

				setLoading(true);
				transaction.wait();
				setLoading(false);

				const transactionCount = await contract.getTransactionCount();

				console.log(transactionCount);

				setTransactionCount(transactionCount.toNumber());

			}

		} catch (error) {
			console.log(error);
		}
	};

	// Fetch All Transaction

	const getAllTransactions = async () => {
		try {
			if (ethereum) { // Check if ethereum object exists in the global window object
				const contract = await connectToTransferFunds();

				const availableTransaction = await contract.getAllTransactions();


				const structuredTransactions = availableTransaction.map((transaction) => ({
					addressTo: transaction.receiver,
					addressFrom: transaction.sender,
					timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
					message: transaction.message,
					// keyword: transaction.keyword,
					amount: parseInt(transaction.amount._hex) / (10 ** 18)
				}));


				setTransactions(structuredTransactions);
			} else {
				console.log("Ethereum object doesn't exist");
			}
		} catch (error) {
			console.log(error);
		}
	};

	// delete  NFT

	const deleteNFT = async (id) => {

		try {
			const contract = await connectingWithSmartContract();

			const transaction = await contract.deleteNFT(id);

			await transaction.wait();


		} catch (error) {
			console.log("error while deleting NFT");
		}

	};

	return (
		<NFTMarketplaceContext.Provider
			value={{
				checkIfWalletIsConnected,
				connectToTransferFunds,
				buyNFT,
				connectWallet,
				uploadToIPFS,
				createNFT,
				fetchNFTs,
				nfts,
				fetchMyNFTsOrListedNFTs,
				currentAccount,
				titleData,
				transferEther,
				getAllTransactions,
				transactionCount,
				transactions,
				accountBalance,
				loading,
				deleteNFT
			}}>
			{children}
		</NFTMarketplaceContext.Provider>
	);
};
