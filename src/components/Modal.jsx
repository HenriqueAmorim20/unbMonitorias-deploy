import { div } from "prelude-ls";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from '../styles/Modal.module.css'



export default function Modal({show, onClose, children, titulo}) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, [])

    const handleClose = (e) =>{
        e.preventDefault();
        onClose();
    }

    const modalContent = show ?  (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <span className={styles.titulo}>{titulo}</span>
                    <span className={styles.spacer}></span>
                    <a href="#" onClick={handleClose}>
                        X
                    </a>
                </div>
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    ) : null

    if(isBrowser) {
        return ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root")
        );
    } else return null;
}