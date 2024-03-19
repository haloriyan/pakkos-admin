import { BiChevronRight, BiHome } from "react-icons/bi";
import styles from "./styles/Jumbo.module.css";
const Jumbo = ({title = '', action = null, middleBreadcrumb = null, withNavigation = false, breadcrumb = null, background = "/jumbo_background.jpg"}) => {
    return (
        <div className={styles.Jumbo}>
            <img 
                src={background} alt="bege" 
                className={styles.Background}
            />
            <div className={styles.Content}>
                {
                    withNavigation &&
                    <>
                        <div className={styles.Navigation}>
                            <BiHome />
                            <BiChevronRight />
                            {
                                middleBreadcrumb !== null &&
                                <>
                                    <div>{middleBreadcrumb}</div>
                                    <BiChevronRight />
                                </>
                            }
                            {
                                breadcrumb === null ? title : breadcrumb
                            }
                        </div>

                        <div className={styles.Separator}></div>
                        <div className={styles.Title}>{title}</div>
                    </>
                }

                {
                    action !== null &&
                    <div className={styles.ActionWrapper}>
                        <div className={styles.Action}>
                            <div>{action.text}</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Jumbo;