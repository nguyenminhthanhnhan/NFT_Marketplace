import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

import Style from "./loginAndSignUp.module.css";
import StyleButton from "./../components/Button/Button.module.css";
import images from "../img";

const LoginAndSignUp = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [activeBtn, setActiveBtn] = useState(1);
	const router = useRouter();

	const handleConfirmPassword = (e) => {
		e.preventDefault();
		if (password !== e.target.value) {
			alert("Passwords do not match");
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:5000/api/v1/users/login", {
				email,
				password,
			});
			console.log(response);
			localStorage.setItem("token", response.data.token);
			router.push("/");
		} catch (error) {
			console.error(error);
		}
	};

	const handleSignUp = async (e) => {
		e.preventDefault();

		// Check if passwords match before making the signup request
		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		try {
			const response = await axios.post("http://localhost:5000/api/v1/users/signup", {
				name,
				email,
				password,
			});
			console.log(response);
			localStorage.setItem("token", response.data.token);
			router.push("/");
		} catch (error) {
			console.error(error);
		}
	};

	const socialImage = [
		{ social: images.facebook, name: "Continue with Facebook" },
		{ social: images.twitter, name: "Continue with Twitter" },
	];

	return (
		<div className={Style.user}>
			<div className={Style.user_img}>
				<Image src={images.SignInBanner} alt="Hero section" className={Style.user_img_img} />
			</div>
			<div className={Style.user_box}>
				<div className={Style.user_box_social}>
					{socialImage.map((el, i) => (
						<div
							key={i + 1}
							onClick={() => setActiveBtn(i + 1)}
							className={`${Style.user_box_social_item} ${activeBtn === i + 1 ? Style.active : ""
								}`}
						>
							<Image
								src={el.social}
								alt={el.name}
								width={30}
								height={30}
								className={Style.user_box_social_item_img}
							/>
							<p>
								<span>{el.name}</span>
							</p>
						</div>
					))}
				</div>
				<p className={Style.user_box_or}>OR</p>

				<form
					className={Style.user_box_input}
					onSubmit={(e) => {
						e.preventDefault();
						router.pathname === "/login" ? handleLogin(e) : handleSignUp(e);
					}}
				>
					{router.pathname === "/login" ? (
						<>
							<div className={Style.user_box_input_box}>
								<label htmlFor="email">Email</label>
								<input
									type="text"
									placeholder="Email"
									className={Style.user_box_input_box_input}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className={Style.user_box_input_box}>
								<label htmlFor="password" className={Style.user_box_input_box_label}>
									<p>Password</p>
								</label>
								<input
									type="password"
									className={Style.user_box_input_box_input}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</>
					) : (
						<>
							<div className={Style.user_box_input_box}>
								<label htmlFor="username">Username</label>
								<input
									type="text"
									placeholder="Username"
									className={Style.user_box_input_box_input}
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className={Style.user_box_input_box}>
								<label htmlFor="email">Email address</label>
								<input
									type="email"
									placeholder="example@example.com"
									className={Style.user_box_input_box_input}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className={Style.user_box_input_box}>
								<label htmlFor="password" className={Style.user_box_input_box_label}>
									<p>Password</p>
								</label>
								<input
									type="password"
									className={Style.user_box_input_box_input}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<label htmlFor="confirmPassword" className={Style.user_box_input_box_label}>
									<p>Confirm Password</p>
								</label>
								<input
									type="password"
									className={Style.user_box_input_box_input}
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									onBlur={handleConfirmPassword}
								/>
							</div>
						</>
					)}
					<button type="submit" className={`${StyleButton.button} ${Style.button}`}>
						{router.pathname === "/login" ? "Login" : "Sign Up"}
					</button>
				</form>
				<p>
					<a href="#">Forget password</a>
				</p>
				<p className={Style.login_box_para}>
					<a href={router.pathname === "/login" ? "/signUp" : "/login"}>
						{router.pathname === "/login" ? "Don't have an account?" : "Already have an account?"}
					</a>
				</p>
			</div>
		</div>
	);
};

export default LoginAndSignUp;
