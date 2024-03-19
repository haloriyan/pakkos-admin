import React, { useEffect, useState } from "react";
import styles from "./styles/Auth.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";
import useAdmin from "../Hooks/useAdmin";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [admin, setAdmin] = useAdmin(false);

    useEffect(() => {
        if (admin !== null && admin !== 'unauthenticated') {
            navigate('/dashboard')
        }
    }, [admin]);

    const submit = e => {
        axios.post(`${config.baseUrl}/api/admin/login`, {
            email: username,
            password,
        })
        .then(response => {
            let res = response.data;
            setMessage({
                body: res.message,
                status: res.status
            });
            if (res.status === 200) {
                window.localStorage.setItem('admin_data', JSON.stringify(res.user));
                navigate('/dashboard');
            }
        })
        e.preventDefault();
    }

    return (
        <>
            <div className={styles.Container}>
                <div className={styles.LeftArea}>
                    <div style={{fontWeight: '800',fontSize: 56}}>Pakkos.com</div>
                </div>
                <form className={styles.Content} onSubmit={submit}>
                    <Input label="Username" value={username} onInput={e => setUsername(e.currentTarget.value)} required />
                    <Input label="Password" value={password} onInput={e => setPassword(e.currentTarget.value)} required type="password" />

                    <Button>Login</Button>

                    {
                        message !== null &&
                        <Alert message={message.body} setMessage={setMessage} status={message.status} />
                    }
                </form>
            </div>
        </>
    )
}

export default Login;