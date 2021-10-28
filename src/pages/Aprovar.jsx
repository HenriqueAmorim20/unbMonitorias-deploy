import Layout from "../components/Layout"
import styles from '../styles/Aprovar.module.css'
import React, { useEffect, useState } from "react";
import { supabase } from '../utils/supabaseClient';
import Inscrito from '../components/Inscrito';

export default function Aprovar(){
    const[ inscritos, setInscritos] = useState([])

    useEffect(() => {
        getInscritos()
    }, [])

    async function getInscritos() {
        const { data } = await supabase
        .from('inscricao')
        .select(`
            idMonitoria(
                id,
                nome,
                professor,
                descricao,
                vagas,
                codigo
            ),
            idUsuario(
                id,
                isAluno,
                nome,
                idAuth,
                matricula,
                idMonitoria,
                horario,
                diaSemana
            )
        `)
        if(data)
            setInscritos(data)
    }

    return (
        <Layout>
             <div className={styles.main}>
                <div className={styles.cards}>
                    {
                        inscritos?.map((inscrito, index) => {
                            return <Inscrito key={index} inscrito={inscrito}></Inscrito>
                        })
                    }
                </div>
             </div>
        </Layout>
    )
} 