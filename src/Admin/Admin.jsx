import React, { useEffect, useState } from "react";
import HeaderAdmin from "../Partials/HeaderAdmin";
import MenuAdmin from "../Partials/MenuAdmin";
import TitleAdmin from "../Partials/TitleAdmin";
import Button from "../components/Button";
import Popup from "../components/Popup";
import { BiX } from "react-icons/bi";
import axios from "axios";
import { configure } from "@testing-library/react";
import config from "../config";
import Input from "../components/Input";
import useAdmin from "../Hooks/useAdmin";

const Admin = () => {
    const [isLoading, setLoading] = useState(true);
    const [admins, setAdmins] = useState([]);
    const [admin, setAdmin] = useState(null);
    const [me, setMe] = useAdmin();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isAdding, setAdding] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [addBtn, setAddBtn] = useState('Tambahkan');
    const [delBtn, setDelBtn] = useState('Hapus');
    const [editBtn, setEditBtn] = useState('Simpan Perubahan');

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.get(`${config.baseUrl}/api/admin`)
            .then(response => {
                let res = response.data;
                setAdmins(res.admins);
            })
        }
    }, [isLoading]);

    const resetForm = () => {
        setLoading(true);
        setName('');
        setEmail('');
        setPassword('');
    }

    const submit = e => {
        setAddBtn('Menambahkan...');
        axios.post(`${config.baseUrl}/api/admin/store`, {
            name, email, password
        })
        .then(response => {
            resetForm();
            setAdding(false);
            setAddBtn('Tambahkan');
        })
        .catch(e => setAddBtn('Tambahkan'));
        e.preventDefault();
    }
    const del = () => {
        setDelBtn('Menghapus');
        axios.post(`${config.baseUrl}/api/admin/delete`, {
            admin_id: admin.id,
        })
        .then(response => {
            let res = response.data
            resetForm();
            setDeleting(false);
            setDelBtn('Hapus');
        })
        .catch(e => setDelBtn('Hapus'));
    }
    const update = (e) => {
        setEditBtn('Menyimpan...');
        axios.post(`${config.baseUrl}/api/admin/update`, {
            admin_id: admin.id,
            name, email, password
        })
        .then(response => {
            let res = response.data;
            resetForm();
            setEditing(false);
            setEditBtn('Simpan Perubahan');
        })
        .catch(e => setEditBtn('Simpan Perubahan'));
        e.preventDefault();
    }

    return (
        <>
            <HeaderAdmin />
            <MenuAdmin active={'administrator'} />
            <div className="content user">
                <TitleAdmin
                    title="Administrator"
                    description="Data admin yang bisa masuk ke dashboard ini"
                    right={
                        <Button accent="secondary" onClick={() => setAdding(true)}>
                            Tambah
                        </Button>
                    }
                />

                <table>
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            admins.map((adm, a) => (
                                <tr key={a}>
                                    <td>{adm.name}</td>
                                    <td>{adm.email}</td>
                                    <td className="inline">
                                        <Button height={32} accent="secondary" onClick={() => {
                                            setAdmin(adm);
                                            setName(adm.name);
                                            setEmail(adm.email);
                                            setEditing(true);
                                        }}>
                                            Edit
                                        </Button>
                                        {
                                            me.id !== adm.id &&
                                            <Button height={32} color="red" accent="secondary" onClick={() => {
                                                setAdmin(adm);
                                                setDeleting(true);
                                            }}>
                                                Hapus
                                            </Button>
                                        }
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
                        title="Tambah Admin"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setAdding(false)}>
                                <BiX />
                            </Button>
                        }
                    />
                    <form onSubmit={submit}>
                        <Input label="Nama" value={name} onInput={e => setName(e.currentTarget.value)} required />
                        <Input label="Email" value={email} onInput={e => setEmail(e.currentTarget.value)} required />
                        <Input label="Password" value={password} onInput={e => setPassword(e.currentTarget.value)} required type="password" />

                        <Button style={{width: '100%'}}>{addBtn}</Button>
                    </form>
                </Popup>
            }

            {
                isEditing &&
                <Popup onDismiss={() => setEditing(false)}>
                    <TitleAdmin
                        title="Edit Data Admin"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setEditing(false)}>
                                <BiX />
                            </Button>
                        }
                    />
                    <form onSubmit={update}>
                        <Input label="Nama" value={name} onInput={e => setName(e.currentTarget.value)} required />
                        <Input label="Email" value={email} onInput={e => setEmail(e.currentTarget.value)} required />
                        <Input label="Ganti Password" value={password} onInput={e => setPassword(e.currentTarget.value)} type="password" />

                        <div style={{fontSize: 12,color: '#717171'}}>Biarkan kosong jika tidak ingin mengganti password</div>

                        <Button style={{width: '100%'}}>{editBtn}</Button>
                    </form>
                </Popup>
            }

            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <TitleAdmin
                        title={`Hapus Admin ${admin.name}`}
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setDeleting(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <div>
                        Yakin ingin menghapus {admin.name}? Tindakan ini tidak dapat dipulihkan
                    </div>

                    <Button onClick={del} color="red" style={{width: '100%',marginTop: 20}}>{delBtn}</Button>
                    <Button onClick={() => setDeleting(false)} color="muted" style={{width: '100%',marginTop: 10}} accent="secondary">batalkan</Button>
                </Popup>
            }
        </>
    )
}

export default Admin;