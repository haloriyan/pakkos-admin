import React, { useEffect, useRef, useState } from "react";
import HeaderAdmin from "../Partials/HeaderAdmin";
import MenuAdmin from "../Partials/MenuAdmin";
import TitleAdmin from "../Partials/TitleAdmin";
import axios from "axios";
import config from "../config";
import { BiBed, BiCheck, BiUser, BiX } from "react-icons/bi";
import styles from "./styles/Master.module.css";
import Pagination from "../components/Pagination";
import Popup from "../components/Popup";
import Button from "../components/Button";

const User = () => {
    const [isLoading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [page, setPage] = useState(1);
    const [raw, setRaw] = useState(null);
    const [multipler, setMultipler] = useState([]);
    const [isSwitchingRole, setSwitchingRole] = useState(null);
    const [switchBtn, setSwitchBtn] = useState('Ya, Ubah Role');

    const actionRef = useRef([]);
    const indexRef = useRef(null);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.get(`${config.baseUrl}/api/user?page=${page}`)
            .then(response => {
                let res = response.data;
                setRaw(res.users);
                setUsers(res.users.data);
            })
        }
    }, [isLoading]);

    const handleAction = (userID, action) => {
        if (action !== "") {
            setSwitchBtn('Mengubah Role...');
            axios.post(`${config.baseUrl}/api/user/action/${action}`, {
                user_id: userID,
            })
            .then(response => {
                let res = response.data;
                setLoading(true);
                setSwitchingRole(null);
                actionRef.current[indexRef.current].value = "";
                setSwitchBtn('Ya, Ubah Role');
            })
            .catch(e => setSwitchBtn('Ya, Ubah Role'));
        }
    }

    return (
        <>
            <HeaderAdmin />
            <MenuAdmin active={'user'} />
            <div className="content user">
                <TitleAdmin
                    title="Pengguna"
                    description="Data pengguna terdaftar"
                />

                <table>
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((usr, u) => {
                                let actions = [];
                                if (usr.role === "host") {
                                    actions.push({
                                        label: "Jadikan User Biasa",
                                        value: "make_common_user"
                                    });
                                } else {
                                    actions.push({
                                        label: "Jadikan Host",
                                        value: "make_host"
                                    });
                                }
                                
                                return (
                                    <tr key={u}>
                                        <td className="inline">
                                            <img src={usr.photo} alt={usr.name} className={styles.Icon} />
                                            {usr.name}
                                        </td>
                                        <td>{usr.email}</td>
                                        <td>
                                            {
                                                usr.role === "host" ?
                                                <div className="inline" style={{gap: 5}}>
                                                    <div className={styles.FacilityIcon} style={{backgroundColor: config.primaryColor,borderRadius: 99,height: 26}}>
                                                        <BiBed color="#fff" size={14} />
                                                    </div> &nbsp; Host
                                                </div>
                                                :
                                                <div className="inline" style={{gap: 5}}>
                                                    <div className={styles.FacilityIcon} style={{borderRadius: 99,height: 26}}>
                                                        <BiUser color={config.primaryColor} size={16} />
                                                    </div> &nbsp; User
                                                </div>
                                            }
                                        </td>
                                        <td>
                                            <select className="input" ref={ref => actionRef.current[u] = ref} onChange={e => {
                                                // handleAction(usr.id, e.currentTarget.value);
                                                setUser(usr);
                                                setSwitchingRole(e.currentTarget.value);
                                                indexRef.current = u;
                                            }}>
                                                <option value="">Pilih aksi...</option>
                                                {
                                                    actions.map((act, a) => (
                                                        <option value={act.value}>{act.label}</option>
                                                    ))
                                                }
                                            </select>
                                        </td>
                                    </tr>
                                )
                            })
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
                isSwitchingRole !== null &&
                <Popup onDismiss={() => {
                    setSwitchingRole(null);
                    actionRef.current[indexRef.current].value = "";
                }}>
                    <TitleAdmin
                        title="Ganti Role User"
                        right={
                            <Button circle color="muted" accent="secondary" onClick={() => {
                                setSwitchingRole(null);
                                actionRef.current[indexRef.current].value = "";
                            }}>
                                <BiX />
                            </Button>
                        }
                    />
                    <div style={{marginBottom: 30}}>
                        Yakin ingin mengganti role {user.name} menjadi {' '}
                        {
                            isSwitchingRole === "make_common_user" && "User Biasa"
                        }
                        {
                            isSwitchingRole === "make_host" && "Host"
                        }
                    </div>

                    <Button style={{width: '100%'}} onClick={() => handleAction(user?.id, isSwitchingRole)}>{switchBtn}</Button>
                </Popup>
            }
        </>
    )
}

export default User;