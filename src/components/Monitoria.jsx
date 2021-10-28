import styles from "../styles/Monitoria.module.css"
import Link from 'next/link'
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AuthContext } from "../contexts/AuthContext";
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from "react"

export default function Monitoria(props){
    const[ sigo, setSigo] = useState(false)
    const isProfessor = props.isProfessor
    const router = useRouter()
    const { usuario } = useContext(AuthContext)
    useEffect(() => {
         sigoMonitoria()
    }, [])

    async function seguir() {
        try {
            await supabase
            .from('seguir')
            .insert([
                { idUsuario: props.usuario.id, idMonitoria: props.monitoria.id },
            ])
            // setTimeout(()=>window.location.reload(),800)
        } catch (error) {
            console.log(error)
        }
    }

    async function deixarSeguir() {
        try {
            await supabase
            .from('seguir')
            .delete()
            .match({'idUsuario': usuario.id, 'idMonitoria': props.monitoria.id})
            // setTimeout(()=>window.location.reload(),800)
        } catch (error) {
            console.log(error)
        }
    }

     // eslint-disable-next-line react-hooks/exhaustive-deps
     async function sigoMonitoria() {
         if(usuario && usuario.id){
            const { data } = await supabase
            .from('seguir')
            .select('*')
            .match({idMonitoria: props.monitoria.id, idUsuario: usuario.id})
            if(data && data[0]){
                setSigo(true)
            } else setSigo(false)
         }
    }

    async function apagar() {
        try {
            await supabase
            .from('monitoria')
            .delete()
            .eq('id', props.monitoria.id)
            router.push("/Monitorias").then(
                setTimeout(()=>window.location.reload(),800)
            )
        } catch (error) {
            console.log(error)
        }
    }

    function setarMonitoriaSelecionada(){
        localStorage.setItem('idMonitoriaSelecionada', props.monitoria.id)
    }

    return(
        <div className={styles.card}>
            <div className={styles.topo}>
                <h4 className={styles.codigo}>{props.monitoria.codigo}</h4>
                <span className={styles.spacer}></span>
                <Link href={{ pathname: '/Detalhe'}}>
                    <button className={styles.btnDetalhar} onClick={setarMonitoriaSelecionada}>
                        <FontAwesomeIcon icon={faInfo} className={styles.icon}/>
                        <span>Detalhar</span>
                    </button>
                </Link>
                {!isProfessor ?
                    sigo ?
                    <button className={styles.btnNaoSeguir} onClick={deixarSeguir}>
                        <FontAwesomeIcon icon={faEyeSlash} className={styles.icon}/>
                        <span>Unfollow</span>
                    </button>
                    :
                    <button className={styles.btnSeguir} onClick={seguir}>
                        <FontAwesomeIcon icon={faEye} className={styles.icon}/>
                        <span>Follow</span>
                    </button>
                : null}
                {isProfessor ?  <button className={styles.btnApagar} onClick={apagar}>
                    <FontAwesomeIcon icon={faTrash} className={styles.icon}/>
                    <span>Apagar</span>
                </button> : <></>}
            </div>
            <span className={styles.nome}>{props.monitoria.nome}</span>
        </div>
    )
}