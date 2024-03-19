import config from "../config";
import styles from "./styles/Input.module.css";

const Input = ({label = 'Label', icon = null, height = 50, type = 'text', multiline = false, placeholder, onInput, required = false, value = null, style, right = null, exportStyles = false}) => {
    if (exportStyles) {
        return {
            styles: styles,
            bottomLine: <div style={{display: 'flex',justifyContent: 'center'}}>
                <div className={styles.BottomLine} style={{backgroundColor: config.primaryColor}}></div>
            </div>
        };
    }
    return (
        <div style={{display: 'flex',flexDirection: 'column',flexGrow: 1}}>
            <div className={styles.Label}>{label}</div>
            <div className={styles.Wrapper} style={style}>
                <div className={styles.Area}>
                    {
                        icon !== null &&
                        <div className={styles.IconArea} style={{height: height}}>
                            {icon}
                        </div>
                    }
                    {
                        multiline ?
                            <textarea placeholder={placeholder} style={{height: 120}} onInput={onInput} required={required} defaultValue={value}></textarea>
                        :
                        <input type={type} style={{height: height}} placeholder={placeholder} onInput={onInput} required={required} value={value} />
                    }
                    {
                        right !== null &&
                        right
                    }
                </div>

                <div style={{display: 'flex',justifyContent: 'center'}}>
                    <div className={styles.BottomLine} style={{backgroundColor: config.primaryColor}}></div>
                </div>
            </div>
        </div>
    )
}

export default Input;