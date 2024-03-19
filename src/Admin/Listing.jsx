import React, { useEffect, useState } from "react";
import HeaderAdmin from "../Partials/HeaderAdmin";
import MenuAdmin from "../Partials/MenuAdmin";
import styles from "./styles/Master.module.css";
import axios from "axios";
import config from "../config";
import TitleAdmin from "../Partials/TitleAdmin";
import { BiBed, BiCalendar, BiCheck, BiLoader, BiMap, BiMoney, BiX } from "react-icons/bi";
import Checkbox from "../components/Checkbox";
import moment from "moment";
import InArray from "../components/InArray";
import Button from "../components/Button";
import Popup from "../components/Popup";
import Separator from "../components/Separator";
import Currency from "../components/Currency";
import Pagination from "../components/Pagination";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Input from "../components/Input";
import { useDebouncedCallback } from "use-debounce";

const Listing = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);
    const [listing, setListing] = useState(null);
    const [multipler, setMultipler] = useState([]);
    const [raw, setRaw] = useState(null);
    const [page, setPage] = useState(1);
    const [q, setQ] = useState(searchParams.get('q'));

    const [isDeleting, setDeleting] = useState(false);
    const [delBtn, setDelBtn] = useState('Hapus Listing');

    const [viewingDetail, setViewingDetail] = useState(false);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.get(`${config.baseUrl}/api/listing?page=${page}&q=${q}`)
            .then(response => {
                let res = response.data;
                setRaw(res.listings);
                setListings(res.listings.data);
            })
        }
    }, [isLoading]);

    const del = () => {
        let payload = {};
        if (viewingDetail) {
            payload = {
                listing_id: listing.id,
            }
        } else {
            payload = {
                listing_id: multipler.join(','),
            }
        }
        setDelBtn('Menghapus...');
        axios.post(`${config.baseUrl}/api/listing/delete`, payload)
        .then(response => {
            let res = response.data;
            setLoading(true);
            setViewingDetail(false);
            setListing(null);
            setMultipler([]);
            setDelBtn('Hapus Listing');
        })
        .catch(e => setDelBtn('Hapus Listing'));
    }

    const setApproval = (action) => {
        axios.post(`${config.baseUrl}/api/listing/approval`, {
            listing_id: listing.id,
            action,
        })
        .then(response => {
            setLoading(true);
            setViewingDetail(false);
        })
    }

    const debounce = useDebouncedCallback(() => setLoading(true), 900);

    return (
        <>
            <HeaderAdmin />
            <MenuAdmin active={'listing'} />
            <div className="content user">
                <TitleAdmin
                    title="Listings"
                    description="Daftar kos yang disewakan"
                    right={
                        <>
                            <Input label="Cari kos" style={{cursor: 'pointer'}} value={q} onInput={e => {
                                let val = e.currentTarget.value;
                                setQ(val);
                                setSearchParams({q: val});
                                debounce()
                            }} right={
                                q !== "" &&
                                <div onClick={() => {
                                    navigate('/listing');
                                    setQ('');
                                    setLoading(true);
                                }}>
                                    <BiX color={'#e74c3c'} />
                                </div>
                            } />
                        </>
                    }
                />
                
                <table>
                    <thead>
                        <tr>
                            <th>
                                <Checkbox active={multipler.length === listings.length} onClick={() => {
                                    let mltp = [...multipler];
                                    if (mltp.length === listings.length) {
                                        mltp = [];
                                    } else {
                                        mltp = [];
                                        listings.map(lst => mltp.push(lst.id));
                                    }
                                    setMultipler(mltp);
                                }} />
                            </th>
                            <th>Kos</th>
                            <th>User</th>
                            <th>Ketersediaan</th>
                            <th><BiCalendar /></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listings.map((list, l) => (
                                <tr key={l}>
                                    <td>
                                        <Checkbox active={InArray(list.id, multipler)} onClick={() => {
                                            let mltp = [...multipler];
                                            if (InArray(list.id, mltp)) {
                                                mltp.splice(mltp.indexOf(list.id), 1);
                                            } else {
                                                mltp.push(list.id);
                                            }
                                            setMultipler(mltp);
                                        }} />
                                    </td>
                                    <td className="inline pointer" onClick={() => {
                                        setListing(list);
                                        setViewingDetail(true);
                                    }}>
                                        <img className={styles.Cover} src={`${config.baseUrl}/storage/listing_photos/${list.front_building_photo}`} alt="Front building" />
                                        <div>
                                            <div style={{textDecorationLine: 'underline',marginBottom: 5}}>
                                                {list.name}
                                            </div>
                                            <div className={styles.Description}>
                                                {list.subdistrict}, {list.city}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{list.user.name}</td>
                                    <td>
                                        {list.room_available} dari {list.room_total} kamar
                                    </td>
                                    <td>
                                        {moment(list.created_at).format('DD MMM, HH:mm')}
                                    </td>
                                    <td>
                                        {
                                            list.is_approved === null ?
                                            <div className="inline" style={{fontSize: 14,gap: 10}}>
                                                <div style={{ height: 18, aspectRatio: 1,borderRadius: 4,backgroundColor: "#fcd840",display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                                                    <BiLoader color="#333" />
                                                </div>
                                                Pending
                                            </div>
                                            :
                                            <>
                                            {
                                                list.is_approved ?
                                                <div className="inline" style={{fontSize: 14,gap: 10}}>
                                                    <div style={{ height: 18, aspectRatio: 1,borderRadius: 4,backgroundColor: "#2ecc71",display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                                                        <BiCheck color="#fff" />
                                                    </div>
                                                    Aktif
                                                </div>
                                                :
                                                <div className="inline" style={{fontSize: 14,gap: 10}}>
                                                    <div style={{ height: 18, aspectRatio: 1,borderRadius: 4,backgroundColor: "#e74c3c",display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                                                        <BiX color="#fff" />
                                                    </div>
                                                    Tidak aktif
                                                </div>
                                            }
                                            </>
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <Pagination
                    next_page_url={raw?.next_page_url}
                    prev_page_url={raw?.prev_page_url}
                    next={() => {
                        setPage(page + 1);
                        setLoading(true);
                    }}
                    prev={() => {
                        setPage(page - 1);
                        setLoading(true);
                    }}
                />
            </div>

            {
                multipler.length > 0 &&
                <div className={styles.FooterFloating}>
                    <div style={{display: 'flex',flexGrow: 1}}>{multipler.length} item dipilih</div>
                    <Button color="red" height={36} onClick={() => setDeleting(true)}>Hapus</Button>
                </div>
            }

            {
                viewingDetail &&
                <Popup onDismiss={() => setViewingDetail(false)}>
                    <TitleAdmin
                        title={listing.name}
                        description={`oleh ${listing.user.name} (User ID : ${listing.user.id})`}
                        right={
                            <>
                                {
                                    listing.is_approved === null &&
                                    <div className="inline">
                                        <Button style={{width: '100%'}} color="red" onClick={() => setApproval('decline')} accent="secondary">Tolak</Button>
                                        <Button style={{width: '100%'}} color="green" onClick={() => setApproval('accept')}>Terima</Button>
                                    </div>
                                }
                                <Button circle accent="secondary" color="muted" onClick={() => setViewingDetail(false)}>
                                    <BiX />
                                </Button>
                            </>
                        }
                    />

                    <div className="inline">
                        <div style={{backgroundImage: `url('${config.baseUrl}/storage/listing_photos/${listing.front_building_photo}')`,width: '45%',height: 210,backgroundSize: 'cover',borderRadius: 12}}></div>
                        <div className="inline" style={{flexGrow: 1,flexWrap: 'wrap'}}>
                            <div className={`${styles.DivWithImage}`} style={{backgroundImage: `url('${config.baseUrl}/storage/listing_photos/${listing.inside_building_photo}')`}}></div>
                            <div className={`${styles.DivWithImage}`} style={{backgroundImage: `url('${config.baseUrl}/storage/listing_photos/${listing.streetview_building_photo}')`}}></div>
                            <div className={`${styles.DivWithImage}`} style={{backgroundImage: `url('${config.baseUrl}/storage/listing_photos/${listing.front_room_photo}')`}}></div>
                            <div className={`${styles.DivWithImage}`} style={{backgroundImage: `url('${config.baseUrl}/storage/listing_photos/${listing.inside_room_photo}')`}}></div>
                        </div>
                    </div>

                    <div style={{marginTop: 20}}>
                        {listing.description}
                    </div>

                    <Separator margin="30px 0px" />

                    <div className="inline">
                        <div className={styles.Title} style={{display: 'flex',flexGrow: 1,gap: 10}}><BiMap /> Lokasi</div>
                        <div className={styles.Description}>
                            {listing.subdistrict}, {listing.city}
                        </div>
                    </div>

                    <div style={{marginTop: 20}}>{listing.address}</div>

                    <Separator margin="30px 0px" />

                    <div className="inline">
                        <div style={{display: 'flex',gap: 10,flexGrow: 1}}>
                            <div className={styles.Title}><BiMoney /> &nbsp; Harga</div>
                        </div>
                        <div>
                            <div className="inline" style={{gap: 2,marginBottom: 10}}>
                                <div>{Currency(listing.price).encode()}</div>
                                <div className={styles.Description} style={{marginTop: 5}}>/bulan</div>
                            </div>
                            {
                                listing.price_inclusion !== null &&
                                <div className={styles.Description}>Termasuk {listing?.price_inclusion}</div>
                            }
                        </div>
                    </div>

                    <Separator margin="30px 0px" />

                    <div className={styles.Title} style={{display: 'flex',gap: 10,marginBottom: 20}}><BiBed /> Detail Kamar</div>

                    <li className={styles.Description}>{listing.room_size} meter</li>
                    <li className={styles.Description}>{listing.room_available} kamar tersedia</li>
                    <li className={styles.Description}>{listing.room_total} total kamar</li>

                    {
                        Object.keys(listing.facilities_display).map(key => (
                            <>
                                <Separator />
                                <div className={styles.Title}>{key}</div>
                                {
                                    listing.facilities_display[key].map((fac, f) => (
                                        <div className="inline" style={{margin: '10px 0px'}}>
                                            <img src={`${config.baseUrl}/storage/facility_icons/${fac.facility.icon}`} alt={fac.facility.name} style={{height: 24,aspectRatio: 1}} />
                                            <div className={styles.Description}>{fac.facility.name}</div>
                                        </div>
                                    ))
                                }
                            </>
                        ))
                    }

                    <Button style={{width: '100%',marginTop: 20}} color="red" onClick={() => {
                        setDeleting(true)
                    }}>Hapus</Button>
                </Popup>
            }

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <TitleAdmin
                        title="Hapus Listing?"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setDeleting(false)}>
                                <BiX />
                            </Button>
                        }
                    />
                    <div>
                        Yakin ingin menghapus listing terpilih? Tindakan ini tidak dapat dipulihkan!
                    </div>


                    <Button style={{width: '100%',marginTop: 30}} color="red" onClick={del}>{delBtn}</Button>
                    <Button style={{width: '100%',marginTop: 10}} color="muted" accent="secondary" onClick={() => setDeleting(false)}>batalkan</Button>
                </Popup>
            }
        </>
    )
}

export default Listing;