import React, { useState } from "react";
import { BsSearch, BsArrowRight } from "react-icons/bs";

//INTERNAL IMPORT
import Style from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleSearch = () => {
		onSearch(searchTerm);
	};

	return (
		<div className={Style.SearchBar}>
			<div className={Style.SearchBar_box}>
				<BsSearch className={Style.SearchBar_box_icon} />
				<input
					type="text"
					placeholder="Type your keyword..."
					value={searchTerm}
					onChange={handleChange}
				/>
				<BsArrowRight
					className={Style.SearchBar_box_icon}
					onClick={handleSearch}
				/>
			</div>
		</div>
	);
};

export default SearchBar;