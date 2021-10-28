import styles from '../styles/Footer.module.css';

const currentdate = new Date();

export default function Footer(){
    return (
        <footer className={styles.footer}> &copy; { currentdate.getFullYear() } Unb Monitorias v1.0</footer>
    )
}