// Sidebar.jsx

import React from 'react';
import Link from 'next/link'; // Import Link from Next.js
import {
    BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
    BsListCheck, BsMenuButtonWideFill, BsFillGearFill
} from 'react-icons/bs';
import styles from './admin.module.css';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
    return (
        <aside id={styles.sidebar} className={openSidebarToggle ? styles.sidebarResponsive : ''}>
            <div className={styles.sidebarTitle}>
                <div className={styles.sidebarBrand}>
                    <BsCart3 className={styles.iconHeader} /> SHOP
                </div>
                <span className={`${styles.icon} ${styles.closeIcon}`} onClick={OpenSidebar}>X</span>
            </div>

            <ul className={styles.sidebarList}>
                <li className={styles.sidebarListItem}>
                    {/* Use Link to navigate to the specified route */}
                    <Link href="/Admin">
                        <a>
                            <BsGrid1X2Fill className={styles.icon} /> Dashboard
                        </a>
                    </Link>
                </li>
                <li className={styles.sidebarListItem}>
                    {/* Use Link to navigate to the NFTs component */}
                    <Link href="/NFTs">
                        <a>
                            <BsFillArchiveFill className={styles.icon} /> NFTs
                        </a>
                    </Link>
                </li>
                <li className={styles.sidebarListItem}>
                    {/* Use Link to navigate to the Users component */}
                    <Link href="/Users">
                        <a>
                            <BsPeopleFill className={styles.icon} /> Users
                        </a>
                    </Link>
                </li>
                {/* Add other sidebar items as needed */}
            </ul>
        </aside>
    );
}

export default Sidebar;