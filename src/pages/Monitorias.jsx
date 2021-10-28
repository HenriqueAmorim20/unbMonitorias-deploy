import Layout from '../components/Layout'
import styles from '../styles/Monitorias.module.css'
import Monitoria from '../components/Monitoria'
import Link from 'next/link'
import { supabase } from '../utils/supabaseClient';
import React, { useEffect, useState } from "react";
import { useContext } from 'react'
import { AuthContext } from "../contexts/AuthContext";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Monitorias(){
    const[ isAluno, setIsAluno] = useState(true)
    const[ monitorias, setMonitorias] = useState([])
    const { user } = useContext(AuthContext)
    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        supabase
            .from('monitoria')
            .select('*')
            .then(response => setMonitorias(response.body))

    }, [user])


    return (
            <Layout>
                <div className={styles.main} id="modal-root">
                    { usuario ? (
                         !usuario.isAluno ?
                             <div className={styles.header}>
                                 <span className={styles.spacer}></span>
                                 <Link href="/AdicionarMonitoria">
                                    <button className={styles.btnAdicionar}>
                                        <FontAwesomeIcon icon={faPlus} className={styles.icon}/>
                                        <span>Adicionar</span>
                                    </button>
                                </Link>
                             </div>
                             : null
                         ) : null
                      }
                    <div className={styles.cards}>
                        {
                            monitorias.map((monitoria, index) => {
                                return <Monitoria key={index} monitoria={monitoria} isProfessor={ usuario ? !usuario.isAluno : false} usuario={usuario} ></Monitoria>
                            })
                        }
                    </div>
                </div>
            </Layout>
    )
}