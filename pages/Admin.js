import React, { useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../styles/admin.module.css';
import Header from '../Admin/Header';
import Sidebar from '../Admin/Sidebar';
import Home from '../Admin/Home';
import NFTs from '../Admin/NFTs';

const Admin = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const router = useRouter();

    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle);
    };


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
        case '/NFTs':
            return <NFTs />;
        default:
            return null; // Or render a default component for unknown routes
    }
};

export default Admin;