import React from "react";
import styles from "./styles/ProgressBar.module.css";
import config from "../config";

const ProgressBar = ({label, rightLabel = null, max, value, size = 10}) => {
    return (
        <div className={styles.Container}>
            <div className={styles.Top}>
                <div className={styles.Label}>{label}</div>
                {
                    rightLabel &&
                    <div className={styles.RightLabel}>{rightLabel}</div>
                }
            </div>
            <div className={styles.Area} style={{backgroundColor: `${config.primaryColor}30`}}>
                <div className={styles.Bar} style={{
                    backgroundColor: `${config.primaryColor}`,
                    height: size,
                    width: `${value / max * 100}%`
                }}></div>
            </div>
        </div>
    )
}

export default ProgressBar;