import React from "react";
import styles from "./styles/Footer.module.css";
import { BiChevronRight, BiCopyright, BiLogoFacebook, BiLogoInstagram, BiLogoWhatsapp, BiLogoYoutube, BiMailSend, BiMap, BiMessage } from "react-icons/bi";
import { FaPlaneArrival, FaPlaneDeparture, FaShoppingBag, FaShopware, FaStore, FaWarehouse } from "react-icons/fa";
import Button from "./Button";

const Footer = () => {
    return (
        <div className={styles.Footer}>
            <div className={styles.Section}>
                <div className={styles.Title}>Promociin</div>
                <a href="/about" className={styles.Item}>
                    <BiChevronRight />
                    Tentang
                </a>
                <a href="/faq" className={styles.Item}>
                    <BiChevronRight />
                    FAQ
                </a>
                <a href="/contact" className={styles.Item}>
                    <BiChevronRight />
                    Kontak
                </a>
            </div>
            <div className={styles.Section}>
                <div className={styles.Title}>Kontak</div>
                <a href="https://wa.me/628123456789" className={styles.Item} target="_blank">
                    <BiLogoWhatsapp />
                    Whatsapp
                </a>
                <a href="mailto:pakkos.com@gmail.com" className={styles.Item}>
                    <BiMailSend />
                    Email
                </a>
                <a href="https://maps.app.goo.gl/PboDBPnW5Fope6KQA" className={styles.Item} style={{alignItems: 'flex-start'}} target="_blank">
                    <BiMap />
                    Koridor Coworking Space, Jalan Tunjungan, Surabaya
                </a>
            </div>

            <div className={styles.SectionFullWidth}>
                <div className={styles.Copyright}>
                    <BiCopyright /> 2024 PROMOCIIN.
                </div>
                <div className={styles.SocialArea}>
                    <a href="#" className={styles.SocialItem}>
                        <BiLogoFacebook />
                    </a>
                    <a href="#" className={styles.SocialItem}>
                        <BiLogoInstagram />
                    </a>
                    <a href="#" className={styles.SocialItem}>
                        <BiLogoYoutube />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer;