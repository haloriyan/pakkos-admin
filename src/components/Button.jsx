import styles from "./styles/Button.module.css";

const Button = ({children, type = 'submit', accent = 'primary', onClick, color = '', height = 50, circle = false, justifyContent = 'center', style}) => {
    return (
        <button onClick={onClick} type={type} className={`${styles.Button} ${accent === 'primary' ? styles.ButtonPrimary : ''} ${accent === 'secondary' ? styles.ButtonSecondary : ''} ${accent === 'tertiary' ? styles.ButtonTertiary : ''} ${styles[color]}`} style={{
            height: height,
            aspectRatio: circle ? 1 : 'auto',
            padding: circle ? '0px' : '0px 25px',
            borderRadius: circle ? 999 : 8,
            justifyContent: justifyContent,
            ...style
        }}>
            {children}
        </button>
    )
}

export default Button;