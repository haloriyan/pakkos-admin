import React from "react";
import styles from "./styles/TitleAdmin.module.css";

const TitleAdmin = ({title = '', description = '', right = null, left = null, style}) => {
    return (
        <div className="inline" style={{marginBottom: 20,flexGrow: 1, ...style}}>
            {
                left !== null &&
                <>{left}</>
            }
            <div className={styles.Left}>
                {
                    typeof title === 'string' ?
                    <div className={styles.Title}>{title}</div>
                    : title
                }
                {
                    description !== "" &&
                    <div className={styles.Description}>{description}</div>
                }
            </div>
            {
                right !== null &&
                <>{right}</>
            }
        </div>
    )
}

export default TitleAdmin;