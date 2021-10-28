import styles from '../styles/AdicionarMonitoria.module.css'
import Layout from '../components/Layout.jsx'
import React, { useEffect, useState } from "react";
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router'


export default function AdicionarMonitoria(){

    const [codigo, setCodigo] = useState('')
    const [nome, setNome] = useState('')
    const [professor, setProfessor] = useState('')
    const [descricao, setDescricao] = useState('')
    const [vagas, setVagas] = useState('')
    const router = useRouter()

    async function criarMonitoria(){
        console.log(codigo, nome, professor, descricao, vagas)
        try {
            await supabase
            .from('monitoria')
            .insert([
                { codigo: codigo, nome: nome, professor: professor, descricao: descricao, vagas: vagas },
            ])
            router.push("/Monitorias").then(
                setTimeout(()=>window.location.reload(),500)
            )
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
             <div className={styles.main}>
                    <div className={styles.card}>
                        <h1 className={styles.title}>Criar uma nova monitoria!</h1>
                        <div className={styles.fields}>
                            <input type="text" placeholder="Código da disciplina" className={styles.field} onChange={event => setCodigo(event.target.value)}/>
                            <input type="text" placeholder="Nome da disciplina" className={styles.field} onChange={event => setNome(event.target.value)}/>
                            <input type="text" placeholder="Professor" className={styles.field} onChange={event => setProfessor(event.target.value)}/>
                            <input type="text" placeholder="Descrição" className={styles.field} onChange={event => setDescricao(event.target.value)}/>
                            <input type="number" placeholder="Número de vagas" className={styles.field} onChange={event => setVagas(event.target.value)}/>
                        </div>
                        <button className={styles.btnCriar} onClick={criarMonitoria}>Criar</button>
                    </div>
                </div>
        </Layout>
    )
}