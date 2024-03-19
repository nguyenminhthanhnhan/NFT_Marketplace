import React from "react";
//INTERNAL IMPORT
import { Button, Category, Brand } from "../components/componentsindex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";

import { useRouter } from "next/router";

const NFTDetails = () => {

  const router = useRouter();
  const { nftData } = router.query;

  console.log(nftData);

  // Parse the nftData JSON string into an object
  const parsedNFTData = JSON.parse(nftData);
  return (
    <div>
      <NFTDetailsPage nftData={parsedNFTData} />
      <Category />
      <Brand />
    </div>
  );
};

export default NFTDetails;
