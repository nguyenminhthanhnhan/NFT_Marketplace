import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { FaUserAlt, FaRegImage, FaUserEdit } from "react-icons/fa";
import { MdHelpCenter } from "react-icons/md";
import { TbDownloadOff, TbDownload } from "react-icons/tb";
import Link from "next/link";

import axios from "axios";

//INTERNAL IMPORT
import Style from "./Profile.module.css";

import images from "../../../img";

import { NFTMarketplaceContext } from '../../../../NFT Marketplace/Context/NFTMarketplaceContext';


const Profile = () => {
  const { currentAccount,
  } = useContext(NFTMarketplaceContext);

  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token not found in localStorage');
        return null;
      }

      const { data } = await axios.get('http://localhost:5000/api/v1/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);

      return data;
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


  return (
    <div className={Style.profile}>
      <div className={Style.profile_account}>
        {
          user?.data?.user?.photo ?
            <Image
              src={user.data.user.photo}
              alt="user profile"
              width={50}
              height={50}
              className={Style.profile_account_img}
            /> :
            <Image
              src={images.user1}
              alt="user profile"
              width={50}
              height={50}
              className={Style.profile_account_img}
            />

        }
        <div className={Style.profile_account_info}>
          <p>
            {user?.data?.user?.name.slice(0, 6) + "..." || 'User Name'}
          </p>
          {
            currentAccount &&
            <small>{currentAccount.slice(0, 5) + "..." + currentAccount.slice(38)}</small>

          }
        </div>
      </div>

      <div className={Style.profile_menu}>
        <div className={Style.profile_menu_one}>
          <div className={Style.profile_menu_one_item}>
            <FaUserAlt />
            <p>
              <Link href={{ pathname: "/myprofile" }}>My Profile</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaRegImage />
            <p>
              <Link href={{ pathname: "/my-items" }}>My Items</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <FaUserEdit />
            <p>
              <Link href={{ pathname: "/edit-profile" }}>Edit Profile</Link>
            </p>
          </div>
        </div>

        <div className={Style.profile_menu_two}>
          <div className={Style.profile_menu_one_item}>
            <MdHelpCenter />
            <p>
              <Link href={{ pathname: "/help" }}>Help</Link>
            </p>
          </div>
          <div className={Style.profile_menu_one_item}>
            <TbDownload />
            <p>
              <Link href={{ pathname: "/disconnet" }}>Disconnet</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
