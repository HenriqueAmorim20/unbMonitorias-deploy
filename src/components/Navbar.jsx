import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from "../contexts/AuthContext";
import { supabase } from '../utils/supabaseClient';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Image from 'next/image'
import myImg from '/public/static/logo.jpeg'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faUserCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Navbar(){
    const router = useRouter()
    const { user } = useContext(AuthContext)
    const { usuario } = useContext(AuthContext) 
    async function logout() {
        try {
            await supabase.auth.signOut();
            router.push("/Home").then(
                setTimeout(()=>{
                    window.location.reload()
                },800)
            )
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <nav className={styles.navbar}>
            <div className={styles.menuItem}>
                <Image src={myImg} alt="logo" width="210" height="70"/>
            </div>
            <Link href="/Home">
                <div className={styles.menuItem}>
                    <FontAwesomeIcon icon={faHome} className={styles.icon}/>
                    <span>Home</span>
                </div>
            </Link>
            {
                 user ?
                 <>
                    <Link href="/Monitorias">
                        <div className={styles.menuItem}>
                            <FontAwesomeIcon icon={faList} className={styles.icon}/>
                            <span>Monitorias</span>
                        </div>
                    </Link>
                    {!usuario?.isAluno ? null :
                        <Link href="/Seguindo">
                            <div className={styles.menuItem}>
                                <FontAwesomeIcon icon={faEye} className={styles.icon}/>
                                <span>Seguindo</span>
                            </div>
                        </Link>
                    }
                    {usuario?.isAluno ? null :
                        <Link href="/Aprovar">
                            <div className={styles.menuItem}>
                                <FontAwesomeIcon icon={faUserCheck} className={styles.icon}/>
                                <span>Aprovar</span>
                            </div>
                        </Link>
                    }
                     <span className={styles.spacer}></span>
                     <span>Olá, {user.email}!</span>
                    <div className={styles.menuItem} onClick={logout}>
                        <FontAwesomeIcon icon={faSignOutAlt} className={styles.icon}/>
                        <span>Logout</span>
                    </div>
                 </>
                 :
                 <>
                     <span className={styles.spacer}></span>
                     <Link href="/Login">
                        <div className={styles.menuItem}>
                            <FontAwesomeIcon icon={faUser} className={styles.icon}/>
                            <span>Entrar/Cadastrar</span>
                        </div>
                     </Link>
                 </>
             }
        </nav>
    )
}