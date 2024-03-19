import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/Alert.module.css";

const Alert = ({message, setMessage, duration = 3000, status = 200}) => {
    useEffect(() => {
        if (message !== null) {
            let to = setTimeout(() => {
                setMessage(null);
            }, duration);

            return () => clearInterval(to);
        }
    }, [message]);

    if (message !== null) {
        return (
            <div className={`${styles.Area} ${styles[`Color_${status.toString()[0]}`]}`}>
                {message}
            </div>
        )
    }
}

export default Alert;