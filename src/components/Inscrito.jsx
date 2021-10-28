import styles from "../styles/Aprovar.module.css"
import { supabase } from '../utils/supabaseClient';
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Inscrito(props){

    const inscrito = props.inscrito

    async function rejeitar(){
        try {
            await supabase
            .from('inscricao')
            .delete()
            .match({'idUsuario': inscrito.idUsuario.id, 'idMonitoria': inscrito.idMonitoria.id})
            // setTimeout(()=>window.location.reload(),500)
        } catch (error) {
            console.log(error)
        }
    }

    async function aprovar() {
        await supabase.from('usuario')
        .update({ idMonitoria: inscrito.idMonitoria.id })
        .eq('id', inscrito.idUsuario.id).then(()=>{
            rejeitar()
            setTimeout(() => {
                window.location.reload()
            }, 800);
        });
    }

    return (
        <div className={styles.card}>
            <div className={styles.topo}>
                <h4 className={styles.codigo}>{inscrito.idUsuario.nome} - {inscrito.idUsuario.matricula}</h4>
                <span className={styles.spacer}></span>
                <button className={styles.btnNaoSeguir} onClick={rejeitar}>
                    <FontAwesomeIcon icon={faBan} className={styles.icon}/>
                    <span>Rejeitar</span>
                </button>
                <button className={styles.btnSeguir} onClick={aprovar}>
                    <FontAwesomeIcon icon={faCheck} className={styles.icon}/>
                    <span>Aprovar</span>
                </button>
            </div>
            <span className={styles.nome}>{inscrito.idUsuario.horario}</span>
            <span className={styles.nome}>{inscrito.idUsuario.diaSemana}</span>
            <span className={styles.nome}>{inscrito.idMonitoria.codigo}</span>
            <span className={styles.nome}>{inscrito.idMonitoria.nome}</span>
        </div>
    )
}