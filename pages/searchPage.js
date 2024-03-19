import React, { useEffect, useState, useContext } from "react";
import Style from "../styles/searchPage.module.css";
import { Slider, Brand } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter } from "../components/componentsindex";
import { NFTCardTwo, Banner } from "../collectionPage/colletionIndex";
import images from "../img";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const SearchPage = () => {
	const { fetchNFTs, currentAccount } = useContext(NFTMarketplaceContext);
	const [nfts, setNfts] = useState([]);
	const [filteredNfts, setFilteredNfts] = useState([]);

	useEffect(() => {
		if (currentAccount) {
			fetchNFTs().then((items) => {
				setNfts(items);
				setFilteredNfts(items);
			});
		}
	}, [currentAccount]);

	const handleSearch = (searchTerm) => {
		// Perform filtering logic based on the searchTerm
		const filtered = nfts.filter((nft) =>
			nft.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredNfts(filtered);
	};

	return (
		<div className={Style.searchPage}>
			<Banner bannerImage={images.creatorbackground2} />
			<SearchBar onSearch={handleSearch} />
			<Filter />
			<NFTCardTwo NFTData={filteredNfts} />
			<Slider />
			<Brand />
		</div>
	);
};

export default SearchPage;