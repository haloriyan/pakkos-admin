import styles from "./styles/Separator.module.css";

const Separator = ({margin = '20px 0px', width = '100%', height = 1, color = '#ddd', style}) => {
    return (
        <div className={styles.Separator} style={{
            margin: margin,
            width: width,
            height: height,
            backgroundColor: color,
            ...style
        }}></div>
    )
}

export default Separator;