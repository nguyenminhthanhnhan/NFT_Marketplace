import React, { useState, useEffect } from "react";

//INTERNAL IMPORT
import Style from "../styles/author.module.css";
import {
	Banner,
	CollectionProfile,
	NFTCardTwo,
} from "../collectionPage/colletionIndex";
import { Slider, Brand } from "../components/componentsindex";
import Filter from "../components/Filter/Filter";

import images from "../img";
import {
	AuthorProfileCard,
	AuthorTaps,
	AuthorNFTCardBox,
} from "../authorPage/componentIndex";

const author = () => {
	const followerArray = [
		{
			background: images.creatorbackground1,
			user: images.user1,
		},
		{
			background: images.creatorbackground2,
			user: images.user2,
		},
		{
			background: images.creatorbackground3,
			user: images.user3,
		},
		{
			background: images.creatorbackground4,
			user: images.user4,
		},
		{
			background: images.creatorbackground5,
			user: images.user5,
		},
		{
			background: images.creatorbackground6,
			user: images.user6,
		},
	];

	return (
		<div className={Style.author}>
			<AuthorProfileCard />
			<Brand />
		</div>
	);
};

export default author;
