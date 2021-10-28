import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "../styles/Layout.module.css";
import NextImage from "next/image";
import unb from "../../public/static/fundo.jpg";

export default function Layout(props) {
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.conteudo}>
        <div className={styles.background} />
        <NextImage
          src={unb}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div className={styles.topo}>
            {props.children}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
