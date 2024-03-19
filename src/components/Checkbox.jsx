import React from "react";
import styles from "./styles/Checkbox.module.css";
import { BiCheck } from "react-icons/bi";

const Checkbox = ({active, setActive = null, onClick = null, size = 20}) => {
    return (
        <div className={`${styles.Area} ${active ? styles.Active : null}`} style={{
            height: size
        }} onClick={() => {
            if (setActive !== null) {
                setActive(!active);
            }
            if (onClick !== null) {
                onClick();
            }
        }}>
            {
                active ? <BiCheck color="#fff" /> : null
            }
        </div>
    )
}

export default Checkbox;