import React, { useEffect, useState } from "react";
import HeaderAdmin from "../Partials/HeaderAdmin";
import MenuAdmin from "../Partials/MenuAdmin";
import { Card, CardContainer } from "../components/Card";
import axios from "axios";
import config from "../config";
import { BiBed, BiChevronRight, BiFile, BiGroup, BiUser } from "react-icons/bi";
import styles from "./styles/Master.module.css";
import ProgressBar from "../components/ProgressBar";
import TitleAdmin from "../Partials/TitleAdmin";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const [max, setMax] = useState(0);

    const [userCount, setUserCount] = useState(0);
    const [listingCount, setListingCount] = useState(0);
    const [reservationCount, setReservationCount] = useState(0);
    const [templates, setTemplates] = useState({});
    const [users, setUsers] = useState([]);
    const [listings, setListings] = useState([]);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.get(`${config.baseUrl}/api/page/admin/dashboard`)
            .then(response => {
                let res = response.data;
                setUserCount(res.user_count);
                setListingCount(res.listing_count);
                setReservationCount(res.reservation_count);
                setTemplates(res.templates);
                setListings(res.listings);
                setUsers(res.users);
            })
        }
    }, [isLoading]);
    
    return (
        <>
            <HeaderAdmin />
            <MenuAdmin active={'dashboard'} />
            <div className="content user">
                <CardContainer>
                    <Card label={'Pengguna'} number={userCount} link={'/user'} icon={<BiGroup />} />
                    <Card label={'Listing'} number={listingCount} link={'/listing'} icon={<BiBed />} />
                    <Card label={'Reservasi'} number={reservationCount} link={'/reservation'} icon={<BiFile />} />
                </CardContainer>

                <div className="inline" style={{marginTop: 40,alignItems: 'flex-start',gap: 40}}>
                    {
                        Object.keys(templates).map((key, k) => {
                            templates[key].map(temp => {
                                if (max < parseInt(temp.count)) {
                                    setMax(temp.count);
                                }
                            });
                            return (
                                <div key={k} className={styles.Card}>
                                    <div className={styles.Title}>{key}</div>
                                    {
                                        templates[key].map((temp, t) => (
                                            <div key={t} style={{marginTop: 20}}>
                                                <ProgressBar label={temp.body} rightLabel={`${temp.count} CTA`} value={temp.count} max={max} />
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        })
                    }
                </div>

                <div className="inline" style={{marginTop: 40,alignItems: 'flex-start',gap: 40}}>
                    <div className={styles.Card}>
                        <TitleAdmin
                            left={<BiBed />}
                            title={<div style={{fontSize: 16,fontWeight: '600'}}>Listing</div>}
                            right={
                                <Link to={'/listing'}>
                                    <BiChevronRight />
                                </Link>
                            }
                        />

                        {
                            listings.map((listing, l) => (
                                <div className="inline" key={l} style={{marginTop: 15}}>
                                    <img src={`${config.baseUrl}/storage/listing_photos/${listing.front_building_photo}`} alt={listing.name} className={styles.Icon} />
                                    <div style={{display: 'flex',flexDirection: 'column',gap: 5,flexGrow: 1}}>
                                        <div className={styles.Title}>{listing.name}</div>
                                        <div className={styles.Description}>{listing.city}</div>
                                    </div>
                                    <div className={styles.Description}>{listing.user.name}</div>
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.Card}>
                        <TitleAdmin
                            left={<BiUser />}
                            title={<div style={{fontSize: 16,fontWeight: '600'}}>Pengguna</div>}
                            right={
                                <Link to={'/user'}>
                                    <BiChevronRight />
                                </Link>
                            }
                        />

                        {
                            users.map((usr, u) => (
                                <div className="inline" key={u} style={{marginTop: 15}}>
                                    <img src={`${usr.photo}`} alt={usr.name} className={styles.Icon} style={{height: 50}} />
                                    <div style={{display: 'flex',flexDirection: 'column',gap: 5,flexGrow: 1}}>
                                        <div className={styles.Title}>{usr.name}</div>
                                        <div className={styles.Description}>{usr.email}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;