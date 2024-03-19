import styles from "./styles/Switch.module.css";

const Switch = ({size = 20, active = false, setActive = null, onChange = null, activeColor = "#2ecc71"}) => {
    return (
        <div className={styles.Switch} onClick={() => {
            if (setActive !== null) {
                setActive(!active);
            }
            if (onChange !== null) {
                onChange();
            }
        }} style={{
            backgroundColor: active ? activeColor : '#dfdfdf'
        }}>
            <div className={styles.Inner} style={{
                height: size,
                marginRight: active ? 0 : size,
                marginLeft: active ? size : 0,
            }}></div>
        </div>
    )
}

export default Switch;