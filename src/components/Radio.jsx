import React from "react";
import styles from "./styles/Radio.module.css";
import config from "../config";

const Radio = ({active = false, size = 20, label = 'Option', onClick = null}) => {
    return (
        <div className={styles.Area} onClick={onClick}>
            <div className={styles.Radio} style={{
                width: size,
                borderColor: active ? config.primaryColor : '#ddd'
            }}>
                {
                    active ?
                    <div className={styles.RadioInner} style={{width: size - 9,backgroundColor: config.primaryColor}}></div>
                    : null
                }
            </div>
            <div>{label}</div>
        </div>
    )
}

export default Radio;