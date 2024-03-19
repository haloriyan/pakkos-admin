import React, { useEffect, useState } from "react";
import styles from "./styles/Scroller.module.css";
import moment from "moment";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Scroller = ({events, count = 4, pos = 0, containerStyle}) => {
    const [theEvents, setTheEvents] = useState(null);
    const [theCount, setTheCount] = useState(window.screen.width > 480 ? count : 1);
    const [position, setPosition] = useState(pos);
    const [hideNext, setHideNext] = useState(false);

    useEffect(() => {
        if (theEvents === null) {
            let evts = [];
            for (let i = position; i < (theCount + position); i++) {
                if (events[i] !== undefined) {
                    evts.push(events[i]);
                    setHideNext(false);
                }
                if (events[i] === undefined || events[i] === null) {
                    setHideNext(true);
                }
            }
            setTheEvents(evts);
        }
    }, [theEvents]);

    const prev = () => {
        setPosition(position - (window.screen.width > 480 ? 3 : 1));
        setTheEvents(null);
    }
    const next = () => {
        setPosition(position + (window.screen.width > 480 ? 3 : 1));
        setTheEvents(null);
    }

    return (
        <div className={styles.Container} style={containerStyle}>
            {
                position > 0 &&
                <div className={`${styles.ControlButton} ${styles.LeftButton}`} onClick={() => prev()}>
                    <BiChevronLeft />
                </div>
            }
            {
                theEvents !== null &&
                theEvents.map((event, e) => (
                    <div className={styles.Card} key={e}>
                        <img src={event.photo} alt={event.name} className={styles.Cover} />
                        <div>
                            <div className={styles.Title}>{event.name}</div>
                            <div className={styles.Organizer}>{event.body}</div>
                        </div>
                    </div>
                ))
            }
            {
                !hideNext &&
                <div className={`${styles.ControlButton} ${styles.RightButton}`} onClick={() => next()}>
                    <BiChevronRight />
                </div>
            }
        </div>
    )
}

export default Scroller;