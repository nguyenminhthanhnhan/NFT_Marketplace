import React from "react";
import Image from "next/image";
import axios from "axios";
//INTERNAL IMPORT
import Style from "../styles/login.module.css";
import images from "../img";
import LoginAndSignUp from "../loginAndSignUp/loginAndSignUp";

const login = () => {
	const refreshPage = () => {
		window.location.reload();
	};

	// LOGING USER 

	const loginUser = async (e, email, password) => {
		e.preventDefault();
		try {

			const res = await axios({

				method: "POST",
				withCredentials: true,
				url: "/api/v1/users/login",
				data: {
					email,
					password
				}
			});

			if (res.data.status === "Success") {

				refreshPage();
				// save to local storage
				localStorage.setItem("user", JSON.stringify(res.data.user));


			}

		} catch (error) {

		}
	}


	return (
		<div
			className={Style.login}
		>
			<div
				className={Style.login_box}

			>
				<h1>Login</h1>
				<LoginAndSignUp />
				<p className={Style.login_box_para}>
					New user? <a href='#'>Create an account</a>
				</p>

			</div>

		</div>
	);
};

export default login;
