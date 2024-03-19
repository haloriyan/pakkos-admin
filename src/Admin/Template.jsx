import React, { useEffect, useState } from "react";
import HeaderAdmin from "../Partials/HeaderAdmin";
import MenuAdmin from "../Partials/MenuAdmin";
import axios from "axios";
import config from "../config";
import TitleAdmin from "../Partials/TitleAdmin";
import Button from "../components/Button";
import Popup from "../components/Popup";
import { BiX } from "react-icons/bi";
import Input from "../components/Input";

const Template = () => {
    const [isLoading, setLoading] = useState(true);
    const [templates, setTemplates] = useState([]);
    const [template, setTemplate] = useState(null);
    const [types, setTypes] = useState([]);

    const [type, setType] = useState('');
    const [body, setBody] = useState('');
    
    const [isAdding, setAdding] = useState(false);
    const [isDeleting, setDeleting] = useState(false);
    const [addBtn, setAddBtn] = useState('Tambahkan');
    const [delBtn, setDelBtn] = useState('Ya, Hapus Template');

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            axios.get(`${config.baseUrl}/api/template`)
            .then(response => {
                let res = response.data;
                setTemplates(res.templates);
                setTypes(res.types);
            })
        }
    }, [isLoading]);
    
    const submit = e => {
        setAddBtn('Menambahkan...');
        axios.post(`${config.baseUrl}/api/template/create`, {
            type, body,
        })
        .then(response => {
            setLoading(true);
            setBody('');
            setAdding(false);
            setAddBtn('Tambahkan');
        })

        e.preventDefault();
    }
    
    const del = () => {
        setDelBtn('Menghapus...');
        axios.post(`${config.baseUrl}/api/template/delete`, {
            template_id: template.id,
        })
        .then(response => {
            setLoading(true);
            setDeleting(false);
            setDelBtn('Ya, Hapus Template');
        })
    }

    return (
        <>
            <HeaderAdmin />
            <MenuAdmin active={'template'} />
            <div className="content user">
                <TitleAdmin
                    title="Template Reservasi"
                    description="Isian form ketika pengguna menanyakan listing kos"
                    right={
                        <Button accent="secondary" onClick={() => setAdding(true)}>
                            Tambah
                        </Button>
                    }
                />

                <table>
                    <thead>
                        <tr>
                            <th>Tipe</th>
                            <th>Template</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(templates).map((key, k) => {
                                return templates[key].map((temp, t) => (
                                    <tr key={t}>
                                        <td>{key}</td>
                                        <td>{temp.body}</td>
                                        <td>
                                            <Button height={32} color="red" accent="secondary" onClick={() => {
                                                setTemplate(temp);
                                                setDeleting(true);
                                            }}>
                                                Hapus
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            })
                        }
                    </tbody>
                </table>
            </div>

            {
                isAdding &&
                <Popup onDismiss={() => setAdding(false)}>
                    <TitleAdmin
                        title="Tambah Template Baru"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setAdding(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <form onSubmit={submit}>
                        <div style={{fontSize: 12,color: '#717171'}}>Tipe Template</div>
                        <select style={{width: '100%'}} required onChange={e => setType(e.currentTarget.value)}>
                            <option value="">Pilih...</option>
                            {
                                types.map((tp, t) => (
                                    <option value={tp}>{tp}</option>
                                ))
                            }
                        </select>

                        <Input label="Value" value={body} onInput={e => setBody(e.currentTarget.value)} required />

                        <Button style={{width: '100%',marginTop: 20}}>{addBtn}</Button>
                    </form>
                </Popup>
            }
            {
                isDeleting &&
                <Popup onDismiss={() => setDeleting(false)}>
                    <TitleAdmin
                        title="Hapus Template"
                        right={
                            <Button circle accent="secondary" color="muted" onClick={() => setDeleting(false)}>
                                <BiX />
                            </Button>
                        }
                    />

                    <div>Yakin ingin menghapus template ini?</div>

                    <Button color="red" style={{width: '100%',marginTop: 20}} onClick={del}>{delBtn}</Button>
                    <Button color="muted" style={{width: '100%',marginTop: 10}} accent="secondary" onClick={() => setDeleting(false)}>Jangan Hapus Template</Button>
                </Popup>
            }
        </>
    )
}

export default Template;