import React, { useState, useEffect, useContext } from 'react'
import Image from "next/image";
import { FaEthereum, FaUserAlt } from "react-icons/fa";

// INTERNAL IMPORT 
import Style from '../styles/transferFunds.module.css';
import formStyle from '../AccountPage/Form/Form.module.css';
import images from '../img';
import { Button, Loader } from "../components/componentsindex";

// IMPORT FROM CONTRACT DATA
import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';


const transferFunds = () => {
    const { currentAccount,
        transferEther,
        loading,
        accountBalance,
        transactions,
        getAllTransactions
    } = useContext(NFTMarketplaceContext);


    const [transferAmount, setTransferAmount] = useState('');
    const [transferAccount, setTransferAccount] = useState('');
    const [message, setMessage] = useState('');
    const [readMessage, setReadMessage] = useState('');
    const [openBox, setOpenBox] = useState(false);

    useEffect(() => {
        getAllTransactions();
    });


    return (
        <div className={Style.transfer}>
            <div className={Style.transfer_box}>
                <h1>Transfer Funds</h1>
                <p>
                    Send funds to another account
                </p>
                <div className={Style.transfer_box_box}>
                    <div className={Style.transfer_box_box_left}>
                        <Image src={images.update} alt="images"
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className={Style.transfer_box_box_right}>
                        <h2>Now You can transfer ether</h2>
                        <div className={Style.transfer_box_box_right_info}>
                            <p className={Style.transfer_box_box_right_info_desktop}>Account: {currentAccount}</p>
                            <p className={Style.transfer_box_box_right_info_mobile}>Account: {currentAccount.slice(1, 30)}</p>
                            <p>Balance:  {accountBalance}</p>
                        </div>
                        {/* TRANFER FIELDS */}
                        <div className={Style.transfer_box_box_right_box}>
                            <div className={formStyle.Form_box_input}>
                                <div className={formStyle.Form_box_input_box}>
                                    <div className={formStyle.Form_box_input_box_icon}>
                                        <FaUserAlt />
                                    </div>
                                    <input type="text" placeholder='address*'
                                        onChange={(e) => setTransferAccount(e.target.value)}

                                    />
                                </div>
                            </div>
                            <div className={formStyle.Form_box_input}>
                                <div className={formStyle.Form_box_input_box}>
                                    <div className={formStyle.Form_box_input_box_icon}>
                                        <FaEthereum />
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="ETH"
                                        onChange={(e) => setTransferAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={formStyle.Form_box_input}>
                                <textarea
                                    name=""
                                    id=""
                                    cols="30"
                                    rows="6"
                                    placeholder="Your message in few words"
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                            </div>

                            {loading ? "loading..." : <Button
                                btnName="Transfer Funds"
                                handleClick={() => transferEther(transferAccount, transferAmount, message)}
                                class={Style.button}
                            />}
                        </div>
                    </div>
                </div>

                {/* TRANSACTION HISTORY */}
                <h1 className={Style.transfer_box_h1}>
                    Transaction History
                </h1>
                <p>lorem ipsum dolor sit amet consectetur adipisicing elit adipisicing</p>

                <div className={Style.transfer_box_history}>
                    {transactions.map((el, i) => (
                        <div className={Style.transfer_box_history_item} key={i + 1}>
                            <Image src={images.MetaMask_Icon} alt="images"
                                width={200}
                                height={200}
                            />

                            <div className={Style.transfer_box_history_item_info}>

                                <p><span>Transfer ID:</span> #{i + 1}</p>
                                <p><span>Amount:</span> {el.amount}</p>
                                <p><span>From:</span> {el.addressFrom}</p>
                                <p><span>To:</span> {el.addressTo}</p>

                                <Button
                                    btnName="Message"
                                    handleClick={() => {
                                        setReadMessage("hahawhawl"),
                                            setOpenBox(true);
                                    }}
                                    classStyle={Style.readButton}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {openBox == false ? (
                    ""
                ) : (
                    <div className={Style.messageBox}
                        onClick={() => setOpenBox(false)}
                    >
                        <div
                            className={Style.messageBox_box}
                        >
                            <p>Transaction Message</p>
                            <p>{readMessage}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default transferFunds
