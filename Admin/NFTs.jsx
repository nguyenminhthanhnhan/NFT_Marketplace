import React, { useState, useContext } from "react";
import {
  FaFilter,
  FaAngleDown,
  FaAngleUp,
  FaWallet,
  FaMusic,
  FaVideo,
  FaImages,
  FaUserAlt,
} from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";

import Style from "./NFTs.module.css";

import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const NFTs = () => {
  const { nfts, deleteNFT } = useContext(NFTMarketplaceContext);

  const [filter, setFilter] = useState(true);
  const [image, setImage] = useState(true);
  const [video, setVideo] = useState(true);
  const [music, setMusic] = useState(true);

  // set TokenId

  const [tokenId, setTokenId] = useState("");

  const openFilter = () => setFilter(!filter);
  const openImage = () => setImage(!image);
  const openVideo = () => setVideo(!video);
  const openMusic = () => setMusic(!music);

  const [currentPage, setCurrentPage] = useState(1);
  const [nftsPerPage] = useState(5);

  const indexOfLastNFT = currentPage * nftsPerPage;
  const indexOfFirstNFT = indexOfLastNFT - nftsPerPage;
  const currentNFTs = nfts ? nfts.slice(indexOfFirstNFT, indexOfLastNFT) : [];

  const handlePageChange = (page) => setCurrentPage(page);

  const renderPaginationButtons = () => {
    const nftArray = nfts || [];
    const pageNumbers = Math.ceil(nftArray.length / nftsPerPage);

    if (pageNumbers <= 1) {
      return null;
    }

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };



    return (
      <div className={Style.Pagination}>
        <button
          className={Style.Pagination_btn}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: pageNumbers }, (_, index) => index + 1).map((number) => (
          <button
            key={number}
            className={`${Style.Pagination_btn} ${currentPage === number ? Style.active : ''}`}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}
        <button
          className={Style.Pagination_btn}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageNumbers}
        >
          Next
        </button>
      </div>
    );
  };

  const deleteNFTs = () => {
    deleteNFT(tokenId);
  };


  return (
    <div className={Style.filter}>
      <div className={Style.filter_box}>
        <div className={Style.filter_box_left}>
          <button onClick={() => { }}>NFTs</button>
          <button onClick={() => { }}>Arts</button>
          <button onClick={() => { }}>Musics</button>
          <button onClick={() => { }}>Sports</button>
          <button onClick={() => { }}>Photography</button>
        </div>

        <div className={Style.filter_box_right}>
          {/* 
          <button type="submit" className={Style.button}
            onClick={deleteNFTs}
          >
            Delete
          </button> */}

        </div>
      </div>


      <div className={Style.filter_box_table}>
        <table className={Style.filter_box_table_box}>
          <thead>
            <tr className={Style.filter_box_table_box_head}>
              <th>Token Id</th>
              <th>Collection</th>
              <th>Seller</th>
              <th>Owner</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {currentNFTs.map((el, i) => (
              <tr key={i} className={Style.filter_box_table_box_head}
                onClick={() => setTokenId(el.tokenId)}
              >
                <td>{i + 1}</td>
                <td>
                  <img src={el.image} alt="" />
                </td>
                <td>{el.seller.slice(0, 10)}</td>
                <td>{el.owner.slice(0, 10)}</td>
                <td>{el.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {renderPaginationButtons()}
      </div>
    </div>
  );
};

export default NFTs;
