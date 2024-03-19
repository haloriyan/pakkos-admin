import React from "react";
import styles from "./styles/Card.module.css";
import { BiChevronRight } from "react-icons/bi";
import { Link } from "react-router-dom";

const CardContainer = ({children}) => {
    return (
        <div className={styles.CardContainer}>
            {children}
        </div>
    )
}

const Card = ({number, label, link, icon = null, style}) => {
    return (
        <Link to={link} className={styles.Card} style={style}>
            <div className={styles.CardNumber}>{number}</div>
            <div className={styles.CardBottom}>
                {icon}
                <div style={{display: 'flex',flexGrow:1}}>
                    {label}
                </div>
                <BiChevronRight />
            </div>
        </Link>
    )
}

export {
    CardContainer, Card
}