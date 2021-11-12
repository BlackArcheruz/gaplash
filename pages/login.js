import styles from '../styles/Login.module.scss'
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { auth , provider } from '../firebase'

const Login = () => {
    const signIn = ()=>{
        auth.signInWithPopup(provider)
    }

    return (
        <>
        <Head>
            <title>Kirish | Gaplash</title>
        </Head>
        <div className={styles.login}>
            <div className={styles.img}></div>
            <h1>Kirish</h1>
            <button className={styles.btn} onClick={signIn}>
                <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon> Google bilan kirish
            </button>
        </div>
        </>
    )
}

export default Login
