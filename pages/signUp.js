import React from "react";

//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import LoginAndSignUp from "../loginAndSignUp/loginAndSignUp";

const signUp = () => {
	return (
		<div className={Style.login}>
			<div className={Style.login_box}>
				<h1>Create account</h1>
				<p className={Style.login_box_para}>
					Welcome! enter your details and start creating, collecting and selling
					NFTs.
				</p>
				<LoginAndSignUp />
			</div>
		</div>
	);
};

export default signUp;
