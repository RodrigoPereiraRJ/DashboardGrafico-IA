import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Modalcontainer.module.sass'
import { useDispatch, useSelector } from 'react-redux'
import { setuser } from '../Redux/Nomeuser'



function Modal() {
    const statemodal = useSelector((state) => state.modalandguide.nameuser.usuariojaescrito);

    const dispatch = useDispatch()
    const divmodal = useRef(null)
    const nomeusuario = useRef(null)

    const [nomeuser, setnomeuser] = useState('')


    function disablemodal() {

        if (divmodal.current && nomeusuario.current) {
            setnomeuser(nomeusuario.current.value)

            divmodal.current.style.display = 'none'
        }


    }

    useEffect(() => {
        if (nomeuser.length > 0) {
            const userdetails = {
                username: nomeuser
            }

            dispatch(setuser(userdetails))
        }

    }, [nomeuser, dispatch])
    return (
        <div>
            {statemodal === false ? (
                <div className={styles.divcontainermodal} ref={divmodal}>
                    <div className={styles.itensmodal}>
                        <div className={styles.titlemodal}>
                            <p>Ola,como podemos te Identificar? </p>
                        </div>
                        <div className={styles.inputtext}>
                            <input type="text" placeholder='Como quer Se identificar?' ref={nomeusuario}/>
                        </div>
                        <div className={styles.botaonmodal}>
                            <button onClick={()=>disablemodal()}>Começar</button>
                        </div>
                    </div>
                    <div>

                    </div>

                </div>
            ) : (
                <div></div>
            )}
        </div>
    )

}

export default Modal