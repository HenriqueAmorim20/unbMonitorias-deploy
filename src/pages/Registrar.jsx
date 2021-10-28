import Layout from '../components/Layout'
import styles from '../styles/Registrar.module.css'
import Link from 'next/link'
import React, { useEffect, useState } from "react";
import { supabase } from '../utils/supabaseClient';
import { useRouter } from 'next/router'

export default function Registrar(){
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')
    const [tipo, setTipo] = useState(true)
    const [matricula, setMatricula] = useState('')

    async function fazerRegistro() {
       const result = await supabase.auth.signUp({
        email: email,
        password: senha
      })
      if(result.user) {
        const res = await supabase
        .from('usuario')
        .insert([
          { isAluno: tipo, nome: nome, idAuth: result.user.id, matricula: matricula },
        ])
        if(res){
            router.push("/Monitorias")
        }
      }
    }
    return (
            <Layout>
                <div className={styles.main}>
                    <div className={styles.card}>
                        <h1 className={styles.title}>Cadastre-se aqui!</h1>
                        <span className={styles.subTitle}>
                            Já tem cadastro?
                            <Link  href="/Login">
                                <span className={styles.link}>Faça login!</span>
                            </Link>
                        </span>
                        <div className={styles.fields}>
                            <input type="text" placeholder="Email" className={styles.field} onChange={event => setEmail(event.target.value)}/>
                            <input type="text" placeholder="Nome" className={styles.field} onChange={event => setNome(event.target.value)}/>
                            <input type="password" placeholder="Senha" className={styles.field} onChange={event => setSenha(event.target.value)}/>
                            { tipo ? <input type="text" placeholder="Matrícula" className={styles.field} onChange={event => setMatricula(event.target.value)}/> : null}
                            <div>
                                <div>
                                    <input type="radio" checked={tipo} onChange={event => setTipo(true)}/>
                                    <span>Aluno</span>
                                    <input type="radio" checked={!tipo} onChange={event => setTipo(false)}/>
                                    <span>Professor</span>
                                </div>
                            </div>
                        </div>
                        <button className={styles.btnEntrar} onClick={fazerRegistro}>Cadastrar</button>
                        {/* <div className={styles.divider}>
                            <span className={styles.dividerLine}></span>
                            <span> ou </span>
                            <span className={styles.dividerLine}></span>
                        </div>
                        <button className={styles.btnGoogle}>Registrar com Google+</button> */}
                    </div>
                </div>
            </Layout>
    )
}