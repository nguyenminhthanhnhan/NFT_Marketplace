import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./HeroSection.module.css";
import { Button } from "../componentsindex";
import images from "../../img";

// SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
const HeroSection = () => {
	const { titleData } = useContext(NFTMarketplaceContext);

	return (
		<div className={Style.heroSection}>
			<div className={Style.heroSection_box}>
				<div className={Style.heroSection_box_left}>
					<h1>{titleData} 🖼️</h1>
					<p>
						Discover the most outstanding NTFs in all topics of life. Creative
						your NTFs and sell them
					</p>
					<Button btnName='Start your search' />
					<div className={Style.heroSection_box_left_info}>
						<div className={Style.heroSection_box_left_info_para}>
							<h2>240k+</h2>
							<p>Total Sale</p>
						</div>
						<div className={Style.heroSection_box_left_info_para}>
							<h2>100k+</h2>
							<p>Auctions</p>
						</div>
						<div className={Style.heroSection_box_left_info_para}>
							<h2>240k+</h2>
							<p>Artists</p>
						</div>
					</div>
				</div>
				<div className={Style.heroSection_box_right}>
					<Image
						src={images.nfthomepage}
						alt='Hero section'
						width={800}
						height={600}
						className={Style.heroSection_box_right_img}
					/>
					<div className={Style.heroSection_box_right_box_para}>
						<h2>Dark World</h2>
						<div className={Style.heroSection_box_right_box_author}>
							<Image
								src={images.user4}
								width={50}
								height={50}
								className={Style.heroSection_box_right_box_author_img}
							/>
							<p>William Jonas</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
