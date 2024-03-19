import React from "react";

//INTERNAL IMPORT
import { NFTDescription, NFTDetailsImg, NFTTabs } from "./NFTDetailsIndex";
import Style from "./NFTDetailsPage.module.css";

const NFTDetailsPage = ({ nftData }) => {

  console.log(nftData);

  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg tokenURL={nftData.image} />
        <NFTDescription />
      </div>
    </div>
  );
};

export default NFTDetailsPage;
