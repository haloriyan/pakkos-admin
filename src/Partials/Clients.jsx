import styles from "./styles/Clients.module.css";

const Clients = ({clients}) => {
    return (
        <div className={styles.Container}>
            {
                clients.map((cli, c) => (
                    <div className={styles.Item} key={cli}>
                        <img src={cli.logo} alt={`Logo ${c}`} className={styles.Image} />
                    </div>
                ))
            }
        </div>
    )
}

export default Clients;