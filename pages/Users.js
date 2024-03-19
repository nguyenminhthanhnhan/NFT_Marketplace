import React, { useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../styles/admin.module.css';
import Header from '../Admin/Header';
import Sidebar from '../Admin/Sidebar';
import Home from '../Admin/Home';
import UserPage from '../Admin/User';

const users = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const router = useRouter();

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };

    console.log('Current Pathname:', router.pathname);

    return (
        <div className={styles.gridContainer}>
            <Header OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />

            {/* Render content based on the current route */}
            {renderContentBasedOnRoute(router.pathname)}
        </div>
    );
};

const renderContentBasedOnRoute = (pathname) => {
    switch (pathname) {
        case '/Admin':
            return <Home />;
        case '/Users':
            return <UserPage />;
        // Add more cases for other routes if needed
        default:
            return null; // Or render a default component for unknown routes
    }
};

export default users;