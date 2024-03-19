import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import "../styles/globals.css";

// INTERNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";

import axios from 'axios';

const MyApp = ({ Component, pageProps }) => {
	const router = useRouter();

	useEffect(() => {
		console.log('Current Pathname:', router.pathname);
	}, [router.pathname]);

	const isOnAdminPage = router.pathname === '/Admin';
	const isNFTsPage = router.pathname === '/NFTs';
	const isUserPage = router.pathname === '/Users';

	const getToken = () => {
		return localStorage.getItem('token');
	};

	const checkUserAdminRole = async (token) => {
		try {
			const response = await axios.get('http://localhost:5000/api/v1/users/me', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const userRole = response.data.data.user.role; // Update this line based on your API response structure

			console.log('User role:', userRole);

			return userRole === 'admin';
		} catch (error) {
			console.error('Error fetching user role:', error);
			return false;
		}
	};

	useEffect(() => {
		const checkUserRole = async () => {
			const token = getToken();

			if (!token) {
				router.push('/login');
				return;
			}

			const isAdmin = await checkUserAdminRole(token);

			if (!isAdmin && (isOnAdminPage || isNFTsPage || isUserPage)) {
				router.push('/');
			}
		};

		checkUserRole();
	}, [router.pathname, isOnAdminPage, isNFTsPage, isUserPage]);

	return (
		<div>
			<NFTMarketplaceProvider>
				{!isOnAdminPage && !isNFTsPage && !isUserPage && <NavBar />}
				<Component {...pageProps} />
				{!isOnAdminPage && !isNFTsPage && !isUserPage && <Footer />}
			</NFTMarketplaceProvider>
		</div>
	);
};

export default MyApp;