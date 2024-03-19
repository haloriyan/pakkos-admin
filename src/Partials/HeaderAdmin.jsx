import { BiCog, BiCompass, BiGroup, BiLogOut, BiMenu, BiNote, BiQr, BiQrScan, BiUser } from "react-icons/bi";
import styles from "./styles/HeaderAdmin.module.css";
import { useEffect, useState } from "react";
import config from "../config";
import useAdmin from "../Hooks/useAdmin";

const HeaderAdmin = ({expand = true, title = '', active = null}) => {
    const [isProfileActive, setProfileActive] = useState(false);
    const [isMenuMobileActive, setMenuMobileActive] = useState(false);
    const [admin, setAdmin] = useAdmin();

    const handleClick = e => {
        let target = e.target;
        let classes = target.classList[0]?.split('_');

        if (window.screen.width > 480) {
            if (classes === undefined || classes?.indexOf('HeaderAdmin') < 0 && isProfileActive) {
                setProfileActive(false);
            }
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    });

    const activeStyle = {borderWidth: 1,borderStyle: 'solid',borderColor: '#ddd'};

    return (
        <>
            <div className={styles.HeaderMobile}>
                <div className={styles.LogoArea}>
                    {/* <img src="/icon.png" alt="Logo Kelas Personalia" className={styles.Logo} /> */}
                    Pakkos
                </div>
                <div className={styles.Toggler} onClick={() => setMenuMobileActive(!isMenuMobileActive)}>
                    <BiMenu />
                </div>
            </div>
            <div className={`${styles.MenuMobile} ${isMenuMobileActive ? styles.MenuMobileActive : ''}`}>
                <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center',gap: 20}}>
                    <div className={styles.ProfileIcon} style={{backgroundColor: config.primaryColor,color: '#fff'}}>
                        <BiUser />
                    </div>
                    <div style={{fontWeight: 600}}>{admin?.name}</div>
                </div>

                <div className={styles.ProfileMenu}>
                    <a href="#" className={`${styles.ProfileMenuItem} ${styles.ProfileMenuItemActive}`}>
                        <BiUser />
                        Profile
                    </a>
                    <a href="#" className={`${styles.ProfileMenuItem}`}>
                        <BiCog />
                        
                        Settings
                    </a>
                    <div className={styles.Separator}></div>
                    <a href="#" className={`${styles.ProfileMenuItem}`}>
                        <BiLogOut />
                        Logout
                    </a>
                </div>
            </div>
            <div className={styles.Header} style={{left: expand ? '0%' : '20%'}}>
                {
                    expand &&
                    <a href="/admin/dashboard" className={styles.LogoArea}>
                        {/* <img src="/icon.png" alt="Logo Kelas Personalia" className={styles.Logo} /> */}
                        Pakkos
                    </a>
                }
                <div className={styles.Left}>
                    {title}
                </div>
                <div className={styles.Right}>
                    <div className={styles.Item} style={{border: active === 'contact-message' ? '1px solid #ddd' : null}}>
                        {admin?.name}
                    </div>
                    <div className={styles.ProfileIcon} onClick={() => setProfileActive(!isProfileActive)} style={{
                        backgroundColor: config.primaryColor,
                        display: 'flex',
                    }}>
                        <BiUser size={24} color="#fff" />
                    </div>
                </div>
            </div>
            {
                isProfileActive &&
                <div className={styles.ProfileMenu}>
                    <a href="#" className={`${styles.ProfileMenuItem} ${styles.ProfileMenuItemActive}`}>
                        <BiUser />
                        Profile
                    </a>
                    <a href="#" className={`${styles.ProfileMenuItem}`}>
                        <BiCog />
                        
                        Settings
                    </a>
                    <div className={styles.Separator}></div>
                    <a href="#" className={`${styles.ProfileMenuItem}`}>
                        <BiLogOut />
                        Logout
                    </a>
                </div>
            }
        </>
    )
}

export default HeaderAdmin;