import Layout from "../components/Layout";
import styles from "../styles/Detalhe.module.css";
import Monitor from "../components/Monitor";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";
import React, { useEffect, useState } from "react";

export default function Detalhe() {
  const [monitoria, setMonitoria] = useState([]);
  const [monitores, setMonitores] = useState([]);
  const [time, setTime] = useState(null);
  const [dia, setDia] = useState("");
  const [inscrito, setInscrito] = useState(false);
  const { usuario } = useContext(AuthContext);
  const isProfessor = !usuario?.isAluno;
  const router = useRouter();

  useEffect(() => {
    findMonitoria();
    buscarMonitores();
    verificaInscricao();
  }, []);

  async function findMonitoria() {
    let idMonitoria = localStorage.getItem("idMonitoriaSelecionada");
    const { data } = await supabase
      .from("monitoria")
      .select("*")
      .eq("id", idMonitoria);
    if (data) setMonitoria(data[0]);
  }

  async function buscarMonitores() {
    let idMonitoria = localStorage.getItem("idMonitoriaSelecionada");
    const { data } = await supabase
      .from("usuario")
      .select("*")
      .eq("idMonitoria", idMonitoria);
    setMonitores(data);
  }

  async function inscreverMonitoria() {
    console.log("aqui");
    let idMonitoria = localStorage.getItem("idMonitoriaSelecionada");
    try {
      await supabase
        .from("usuario")
        .update({ horario: time, diaSemana: dia })
        .eq("id", usuario.id)
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 800);
        });
      const result = await supabase
        .from("inscricao")
        .insert([{ idUsuario: usuario?.id, idMonitoria: idMonitoria }]);
      if (!result.error)
        router
          .push("/Monitorias")
          .then(setTimeout(() => window.location.reload(), 500));
    } catch (error) {
      console.log(error);
    }
  }

  async function verificaInscricao() {
    let idMonitoria = localStorage.getItem("idMonitoriaSelecionada");
    const { data } = await supabase
      .from("inscricao")
      .select("*")
      .match({ idUsuario: usuario?.id, idMonitoria: idMonitoria });
    if (data && data[0]) setInscrito(true);
  }

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.card}>
          <h1 className={styles.title}>Detalhes da Monitoria</h1>
          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.field}>
                <h4 className={styles.fieldTitle}>Código: </h4>
                <span>{monitoria.codigo}</span>
              </div>
              <div className={styles.field}>
                <h4 className={styles.fieldTitle}>Disciplina: </h4>
                <span>{monitoria.nome}</span>
              </div>
              <div className={styles.field}>
                <h4 className={styles.fieldTitle}>Professor: </h4>
                <span>{monitoria.professor}</span>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.field}>
                <h4 className={styles.fieldTitle}>Descrição: </h4>
                <span>{monitoria.descricao}</span>
              </div>
            </div>
          </div>
          <div className={styles.listaMonitores}>
            <h4 className={styles.fieldTitle}>Lista de Monitores</h4>
            <ul className={styles.monitores}>
              {monitores?.map((monitor, index) => {
                return (
                  <Monitor
                    key={index}
                    monitor={monitor}
                    isProfessor={isProfessor}
                  ></Monitor>
                );
              })}
            </ul>
          </div>
          {isProfessor}
          {isProfessor ? null : (
            <div
              style={{
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "10px 20px",
              }}
            >
              <h4>
                Para inscrever-se na monitoria, preencha seu horário e dia da
                semana disponível.
              </h4>
              <div className={styles.fields}>
                <input
                  type="time"
                  placeholder="14:00"
                  className={styles.field}
                  onChange={(event) => setTime(event.target.value)}
                />
                <input
                  type="text"
                  placeholder="Dia da semana"
                  className={styles.field}
                  onChange={(event) => setDia(event.target.value)}
                />
              </div>
              {inscrito ? (
                <span>Você já se inscreveu nessa monitoria!</span>
              ) :(
                <button
                  className={
                    dia && time?.length > 3
                      ? styles.btnCadastrar
                      : styles.btnDisabled
                  }
                  disabled={!(dia && time?.length > 3)}
                  onClick={inscreverMonitoria}
                >
                  Inscrever-me
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
