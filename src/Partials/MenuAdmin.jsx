import React, { useState } from "react";
import styles from "./styles/MenuAdmin.module.css";
import { BiAlarmExclamation, BiBed, BiCategory, BiChevronLeft, BiComment, BiEdit, BiGroup, BiHome, BiListCheck, BiMap, BiMobile, BiSolidCoupon, BiTag, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";

const MenuAdmin = ({active}) => {
    const [mobileShowMenu, setMobileShowMenu] = useState(false);
    const [isPublic, setPublic] = useState(false);

    if (window.screen.width > 480) {
        return (
            <div className={styles.Menu}>
    
                <div className={styles.MenuArea}>
                    <Link to="/dashboard" className={`${styles.MenuItem} ${active === 'dashboard' ? styles.MenuActive : ''}`}>
                        <BiHome />
                        <div className={styles.MenuText}>Dashboard</div>
                    </Link>
                    <div style={{color: '#999',fontSize: 14,fontWeight: 600,margin: '20px 0px 10px 0px'}}>
                        Master Data
                    </div>
                    <Link to="/listing" className={`${styles.MenuItem} ${active === 'listing' ? styles.MenuActive : ''}`}>
                        <BiBed />
                        <div className={styles.MenuText}>Listings</div>
                    </Link>
                    <Link to="/facility" className={`${styles.MenuItem} ${active === 'facility' ? styles.MenuActive : ''}`}>
                        <BiCategory />
                        <div className={styles.MenuText}>Fasilitas</div>
                    </Link>
                    <Link to="/user" className={`${styles.MenuItem} ${active === 'user' ? styles.MenuActive : ''}`}>
                        <BiGroup />
                        <div className={styles.MenuText}>Pengguna</div>
                    </Link>
                    <Link to="/city" className={`${styles.MenuItem} ${active === 'city' ? styles.MenuActive : ''}`}>
                        <BiMap />
                        <div className={styles.MenuText}>Kota</div>
                    </Link>
                    <Link to="/template" className={`${styles.MenuItem} ${active === 'template' ? styles.MenuActive : ''}`}>
                        <BiComment />
                        <div className={styles.MenuText}>Template Reservasi</div>
                    </Link>
                    <Link to="/administrator" className={`${styles.MenuItem} ${active === 'administrator' ? styles.MenuActive : ''}`}>
                        <BiGroup />
                        <div className={styles.MenuText}>Administrator</div>
                    </Link>

                    <div style={{color: '#999',fontSize: 14,fontWeight: 600,margin: '20px 0px 10px 0px'}}>
                        Statistik
                    </div>
                    <Link to="/reservation" className={`${styles.MenuItem} ${active === 'reservation' ? styles.MenuActive : ''}`}>
                        <BiGroup />
                        <div className={styles.MenuText}>Reservasi</div>
                    </Link>

                </div>
            </div>
        )
    }
}

export default MenuAdmin;