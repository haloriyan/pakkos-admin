import React, { useEffect, useState } from "react";
import HeaderAdmin from "../Partials/HeaderAdmin";
import MenuAdmin from "../Partials/MenuAdmin";
import styles from "./styles/Master.module.css";
import axios from "axios";
import config from "../config";
import TitleAdmin from "../Partials/TitleAdmin";
import Button from "../components/Button";
import { BiPlus, BiSolidStar, BiStar, BiTrash, BiX } from "react-icons/bi";
import Popup from "../components/Popup";
import Input from "../components/Input";
import InputFile from "../components/InputFile";
import Separator from "../components/Separator";

const Facility = () => {
    const [isLoading, setLoading] = useState(true);
    const [facilities, setFacilities] = useState([]);
    const [facility, setFacility] = useState(null);
    const [types, setTypes] = useState([]);

    const [icon, setIcon] = useState(null);
    const [name, setName] = useState('');
    const [type, setType] = useState('');

    const [creatingType, setCreatingType] = useState(false);
    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [addBtn, setAddBtn] = useState('Tambahkan');
    const [delBtn, setDelBtn] = useState('Ya, Hapus Fasilitas');

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.get(`${config.baseUrl}/api/facility`)
            .then(response => {
                let res = response.data;
                setFacilities(res.facilities);
                setTypes(res.types);
            })
        }
    }, [isLoading]);

    const resetForm = () => {
        setLoading(true);
        setName('');
        setType('');
        setIcon(null);
    }

    const submit = e => {
        setAddBtn('Menambahkan...');
        let formData = new FormData();
        formData.append('icon', icon);
        formData.append('name', name);
        formData.append('type', type);

        axios.post(`${config.baseUrl}/api/facility/create`, formData)
        .then(response => {
            resetForm();
            setAddBtn('Tambahkan');
            setAdding(false);
        })
        .catch(e => setAddBtn('Tambahkan'));
        e.preventDefault();
    }

    const del = () => {
        setDelBtn('Menghapus...');
        axios.post(`${config.baseUrl}/api/facility/delete`, {
            facility_id: facility.id,
        })
        .then(response => {
            let res = response.data;
            resetForm();
            setDelBtn('Ya, Hapus Fasilitas');
            setDeleting(false);
        })
    }

    return (
        <>
            <HeaderAdmin />
            <MenuAdmin active={'facility'} />
            <div className="content user">
                <TitleAdmin
                    title="Fasilitas"
                    description="Daftar fasilitas yang bisa ditampilkan oleh host pada kamar mereka"
                    right={
                        <Button accent="secondary" onClick={() => setAdding(true)}>
                            <BiPlus />
                            Tambah Fasilitas
                        </Button>
                    }
                />

                {
                    Object.keys(facilities).map((fac, fi) => (
                        <div key={fi} style={{marginTop: 40}}>
                            <div className={styles.Title} style={{marginBottom: 20}}>{fac}</div>
                            <div className={styles.FacilityArea}>
                                {
                                    facilities[fac].map((fc, f) => (
                                        <div key={f} className={styles.FacilityItem}>
                                            <img src={`${config.baseUrl}/storage/facility_icons/${fc.icon}`} alt={fc.name} className={styles.FacilityIcon} />
                                            <div className={styles.FacilityName}>{fc.name}</div>
                                            <Button circle color="red" accent="secondary" height={30} onClick={() => {
                                                setFacility(fc);
                                                setDeleting(true);
                                            }}>
                                                <BiTrash />
                                            </Button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>

            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)}>
                    <TitleAdmin
                        title="Tambah Fasilitas"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setAdding(false)}>
                                <BiX />
                            </Button>
                        }
                    />
                    <form onSubmit={submit}>
                        <div className="inline">
                            <div style={{display: 'flex',flexDirection: 'column',gap: 5,flexGrow: 1}}>
                                <div style={{fontWeight: '600'}}>Icon</div>
                                <div style={{fontSize: 12,color: '#777'}}>SVG, 1:1</div>
                            </div>
                            <InputFile size="100px" labelStyle={{fontSize: 12,color: '#777'}} onChange={(input,e) => {
                                setIcon(input.files[0])
                            }} />
                        </div>
                        <Input label="Nama Fasilitas" value={name} placeholder={'cth: Wifi, Penerangan Parkir, Tempat Nongkrong, dsb'} onInput={e => setName(e.currentTarget.value)} required />

                        <div style={{fontSize: 12,color: '#777'}}>Tipe Fasilitas</div>
                        <select onChange={e => {
                            let val = e.currentTarget.value;
                            if (val === "new") {
                                setType('');
                                setCreatingType(true);
                            } else {
                                setCreatingType(false);
                                setType(val);
                            }
                        }}>
                            <option value="">Pilih tipe...</option>
                            {
                                types.map((tp, t) => (
                                    <option value={tp}>{tp}</option>
                                ))
                            }
                            <option value="new">Tambah Baru</option>
                        </select>
                        {
                            creatingType &&
                            <Input label="" value={type} placeholder={'cth: Fasilitas Kamar, Fasilitas Parkir, dsb'} onInput={e => setType(e.currentTarget.value)} required />
                        }

                        <Button style={{width: '100%',marginTop: 20}}>{addBtn}</Button>
                    </form>
                </Popup>
            }
            {
                isDeleting && 
                <Popup onDismiss={() => setDeleting(false)}>
                    <TitleAdmin
                        title="Hapus Fasilitas"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setDeleting(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <div>Yakin ingin menghapus fasilitas {facility.name}?</div>

                    <Button style={{width: '100%',marginTop: 20}} color="red" onClick={del}>Ya, Hapus Fasilitas</Button>
                    <Button style={{width: '100%',marginTop: 10}} color="muted" onClick={() => setDeleting(false)} accent="secondary">Jangan Hapus Fasilitas</Button>
                </Popup>
            }
        </>
    )
}

export default Facility;