import React from "react";

import ArtistPage from "../ArtistPage/ArtistPage";
import Style from "../styles/ArtistPage.module.css";
import { FollowerTab, Slider } from "../components/componentsindex";

const Artist = () => {
	return (
		<div className={Style.ArtistPage}>
			<ArtistPage />
			<FollowerTab />
		</div>
	);
};

export default Artist;
