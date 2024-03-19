import React, { useEffect, useState } from "react";
import MenuAdmin from "../Partials/MenuAdmin";
import HeaderAdmin from "../Partials/HeaderAdmin";
import TitleAdmin from "../Partials/TitleAdmin";
import Button from "../components/Button";
import { BiEdit, BiPlus, BiTrash, BiX } from "react-icons/bi";
import Popup from "../components/Popup";
import axios from "axios";
import config from "../config";
import Input from "../components/Input";
import Radio from "../components/Radio";

const City = () => {
    const [isLoading, setLoading] = useState(true);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState(null);
    const [name, setName] = useState('');

    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [addBtn, setAddBtn] = useState('Tambahkan');
    const [delBtn, setDelBtn] = useState('Hapus');
    const [editBtn, setEditBtn] = useState('Simpan Perubahan');

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.get(`${config.baseUrl}/api/city`)
            .then(response => {
                let res = response.data;
                setCities(res.cities);
            })
        }
    }, [isLoading]);

    const resetForm = () => {
        setLoading(true);
        setName('');
    }

    const submit = e => {
        setAddBtn('Menambahkan...');
        axios.post(`${config.baseUrl}/api/city/create`, {
            name,
        })
        .then(response => {
            resetForm();
            setAdding(false);
            setAddBtn('Tambahkan');
        })
        .catch(e => setAddBtn('Tambahkan'));

        e.preventDefault();
    }

    const update = e => {
        setEditBtn('Menyimpan...');
        axios.post(`${config.baseUrl}/api/city/update`, {
            city_id: city.id,
            name,
        })
        .then(response => {
            resetForm();
            setEditBtn('Simpan Perubahan');
            setEditing(false);
        })
        e.preventDefault();
    }

    const del = (e) => {
        setDelBtn('Menghapus...');
        axios.post(`${config.baseUrl}/api/city/delete`, {
            city_id: city.id,
        })
        .then(response => {
            resetForm();
            setDelBtn('Hapus');
            setDeleting(false);
        })
        .catch(e => setDelBtn('Hapus'));
        e.preventDefault();
    }

    const setDefault = (city_id) => {
        axios.post(`${config.baseUrl}/api/city/default`, {
            city_id,
        })
        .then(response => {
            console.log(response.data);
            setLoading(true);
        })
    }

    return (
        <>
            <HeaderAdmin />
            <MenuAdmin active={'city'} />
            <div className="content user">
                <TitleAdmin
                    title="Kota"
                    description="List kota untuk pengguna filter lokasi tempat kos inginkan"
                    right={
                        <Button accent="secondary" onClick={() => setAdding(true)}>
                            <BiPlus />
                            Tambah
                        </Button>
                    }
                />

                <div style={{height: 40}}></div>
                <table>
                    <thead>
                        <tr>
                            <th>Kota</th>
                            <th>Default</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cities.map((cit, c) => (
                                <tr key={c}>
                                    <td>{cit.name}</td>
                                    <td>
                                        <Radio active={parseInt(cit.is_default)} onClick={() => setDefault(cit.id)} label={null} />
                                    </td>
                                    <td className="inline">
                                        <Button height={32} onClick={() => {
                                            setCity(cit);
                                            setName(cit.name);
                                            setEditing(true)
                                        }}>
                                            <BiEdit />
                                        </Button>
                                        <Button height={32} color="red" onClick={() => {
                                            setCity(cit);
                                            setName(cit.name);
                                            setDeleting(true);
                                        }}>
                                            <BiTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)}>
                    <TitleAdmin
                        title="Tambah Kota Baru"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setAdding(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <form onSubmit={submit}>
                        <Input label="Nama Kota" value={name} onInput={e => setName(e.currentTarget.value)} required />
                        <Button>{addBtn}</Button>
                    </form>
                </Popup>
            }

            {
                isEditing &&
                <Popup onDismiss={() => setEditing(false)}>
                    <TitleAdmin
                        title="Ubah Kota"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setEditing(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <form onSubmit={update}>
                        <Input label="Nama Kota" value={name} onInput={e => setName(e.currentTarget.value)} required />
                        <Button>{editBtn}</Button>
                    </form>
                </Popup>
            }

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <TitleAdmin
                        title={`Hapus Kota ${city.name}`}
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setDeleting(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <form onSubmit={del}>
                        <div>Yakin ingin menghapus kota {city.name}? Tindakan ini tidak dapat dipulihkan</div>
                        <Button color="red" style={{width: '100%',marginTop: 10}}>{delBtn}</Button>
                        <Button color="muted" style={{width: '100%',marginTop: 0}} accent="secondary" onClick={() => setDeleting(false)}>batalkan</Button>
                    </form>
                </Popup>
            }
        </>
    )
}

export default City