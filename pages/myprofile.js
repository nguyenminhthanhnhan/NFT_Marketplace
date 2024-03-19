import React, { useCallback, useState, useContext, useEffect } from "react";

import { useDropzone } from "react-dropzone";

import { TiTick } from "react-icons/ti";

import { useRouter } from "next/router"; // Import the useRouter hook

//INTERNAL IMPORT
import Style from "../styles/myprofile.module.css";

import axios from "axios";

import Image from "next/image";

// INTERNAL IMPORT
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

import images from "../img";

const myprofile = () => {

    const router = useRouter();



    const { uploadToIPFS,
        currentAccount,
        accountBalance,
        transactions,
        getAllTransactions
    } = useContext(NFTMarketplaceContext);

    const [fileUrl, setFileUrl] = useState(null);

    // const [image, setImage] = useState(null);

    const onDrop = useCallback(async (acceptedFile) => {
        const url = await uploadToIPFS(acceptedFile[0]);
        setFileUrl(url);
        // setImage(url);
        console.log(url);
    });

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
        maxSize: 5000000,
    });

    // 
    // 
    // 
    // 
    // 

    const [user, setUser] = useState(null);

    useEffect(() => {
        getAllTransactions();
    });

    const getUser = async () => {
        try {
            const token = localStorage.getItem('token');

            if (token === null) {
                return router.push('/login');
            }

            const { data } = await axios.get('http://localhost:5000/api/v1/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // check if and return to login page if not logged in

            if (!data) {
                return router.push('/login');
            } else {

                console.log(data);
                return data;
            }


        } catch (error) {
            console.error('Error in getUser:', error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUser();
            setUser(userData);
        };

        // console.log(user);

        fetchUser();
    }, []);

    // update profile

    const updateProfile = async () => {
        try {
            const token = localStorage.getItem('token');

            const photo = null;

            if (token === null) {
                return router.push('/login');
            }

            if (fileUrl) {
                photo = fileUrl;
            } else {
                photo = user.data.user.photo;
            }


            const { data } = await axios.post('http://localhost:5000/api/v1/users/updateMe', {

                name: user.name,
                photo: photo,

            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!data) {
                return router.push('/login');
            } else {
                console.log(data);
                return data;
            }


        } catch (error) {
            console.error('Error in getUser:', error);
            throw error;
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProfile();

        window.location.reload();
    };





    return (
        <div className={Style.user}>
            <div className={Style.user_img}>
                <Image
                    src={images.SignInBanner}
                    alt='Hero section'
                    className={Style.user_img_img}
                />
            </div>
            <div className={Style.user_box}>
                <form
                    className={Style.user_box_input}
                    onSubmit={handleSubmit}
                >

                    <div className={Style.DropZone_box}>
                        <div className={Style.DropZone_box_input}>
                            <p>
                                <span>
                                    <TiTick />
                                </span>
                                Drop images here
                            </p>
                            <div className={Style.DropZone_box_input_img} {...getRootProps()}>
                                <Image
                                    src={images.upload}
                                    alt='upload'
                                    width={100}
                                    height={100}
                                    objectFit='contain'
                                    className={Style.DropZone_box_input_img_img}
                                />
                                <input {...getInputProps()} />
                            </div>
                            {fileUrl ?
                                <Image
                                    src={fileUrl}
                                    alt='nft image'
                                    width={200}
                                    height={200}
                                />
                                :
                                user?.data?.user?.photo ?
                                    <Image
                                        src={user?.data?.user?.photo}
                                        alt='nft image'
                                        width={200}
                                        height={200}
                                    />
                                    :
                                    <Image
                                        src={images.defaultpicture}
                                        alt='nft image'
                                        width={200}
                                        height={200}
                                    />
                            }

                        </div>
                    </div>

                    <div className={Style.user_box_input_box}>
                        <label htmlFor="name">name</label>
                        <input
                            type="text"
                            placeholder="name"
                            className={Style.user_box_input_box_input}
                            // defaultValue={user?.name}
                            defaultValue={user?.data?.user?.name || 'User Name'}

                            onChange={(e) => setUser({ ...user, name: e.target.value })}



                        />
                    </div>
                    <div className={Style.user_box_input_box}>
                        <label htmlFor="name">Wallet Address</label>
                        <input
                            type="text"
                            placeholder="name"
                            className={Style.user_box_input_box_input}
                            // defaultValue={user?.name}
                            defaultValue={currentAccount || 'No Wallet'}
                            disabled

                        />
                    </div>
                    <div className={Style.user_box_input_box}>
                        <label htmlFor="Balance">Balance</label>
                        <input
                            type="text"
                            placeholder="Balance"
                            className={Style.user_box_input_box_input}
                            // defaultValue={user?.name}
                            defaultValue={accountBalance || 'No Balance'}
                            disabled
                        />
                    </div>
                    <div className={Style.user_box_input_box}>
                        <label htmlFor="Balance">Transaction</label>
                        {
                            transactions?.map((item, i) => (
                                <div key={i}>
                                    <input
                                        type="text"
                                        placeholder="Balance"
                                        className={Style.user_box_input_box_input}
                                        // defaultValue={user?.name}
                                        defaultValue={i}
                                        disabled
                                    />
                                </div>
                            ))
                        }
                    </div>
                    <button type="submit" className={Style.button}>
                        Update
                    </button>
                </form>
                <p>
                    <a href="">Forget password</a>
                </p>
                <p>
                    <a href="#">Change Password</a>
                </p>
            </div >
        </ div>
    );
};

export default myprofile;