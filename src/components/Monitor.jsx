import styles from "../styles/Detalhe.module.css"
import { supabase } from '../utils/supabaseClient';

export default function Monitor(props){

    const isProfessor = props.isProfessor

    async function apagarMonitor() {
        await supabase.from('usuario')
        .update({ idMonitoria: null })
        .eq('id', props.monitor.id).then(()=>{
            setTimeout(() => {
                window.location.reload()
            }, 800);
        });
    }

    return (
        <div className={styles.monitor}>
            <span>{props.monitor.nome} - {props.monitor.matricula}, horário: {props.monitor.horario}, Dia: {props.monitor.diaSemana}</span>
            <span className={styles.spacer}></span>
            {isProfessor ? <button onClick={apagarMonitor} className={styles.btnApagar}>Excluir</button> : null}
        </div>
    )
}