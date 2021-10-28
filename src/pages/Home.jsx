import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import NextImage from "next/image";
import unb from "../../public/static/fundo.jpg";
import Link from "next/link";
import Image from "next/image";
import myImg from "/public/static/unb.png";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const { usuario } = useContext(AuthContext);
  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.background} />
        <NextImage
          src={unb}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div className={styles.home}>
          <Image src={myImg} alt="logo" width="200" height="200" />
          <h1>Unb Monitorias</h1>
          <span>Conheça nosso processo de monitorias!</span>
          <h2>Processo Seletivo 2022</h2>
          <h2>Incrições Abertas!</h2>
          <span>data limite: 03/02/2022</span>
          <span className={styles.spacer}></span>
          {!usuario?.id ? (
            <Link href="/Login">
              <button className={styles.btnCadastrarHome}>
                Cadastre-se já!
              </button>
            </Link>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
