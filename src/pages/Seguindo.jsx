import Layout from "../components/Layout";
import styles from "../styles/Seguindo.module.css";
import Link from "next/link";
import { supabase } from "../utils/supabaseClient";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Monitoria from "../components/Monitoria";

export default function Seguindo() {
  const [monitorias, setMonitorias] = useState([]);
  const { user } = useContext(AuthContext);
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    buscarMonitorias();
  }, [buscarMonitorias]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function buscarMonitorias() {
    if (usuario && usuario.id) {
      const { data } = await supabase
        .from("seguir")
        .select(
          `
                idMonitoria(
                    id,
                    nome,
                    professor,
                    descricao,
                    vagas,
                    codigo
                )
            `
        )
        .match({ idUsuario: usuario.id });
      setMonitorias(data);
    }
  }

  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.cards}>
          {monitorias?.map((monitoria, index) => {
            return (
              <Monitoria
                key={index}
                monitoria={monitoria.idMonitoria}
                isProfessor={usuario ? !usuario.isAluno : false}
              ></Monitoria>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
