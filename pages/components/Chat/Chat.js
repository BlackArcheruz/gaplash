import { useAuthState } from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import { auth, db } from '../../../firebase'
import styles from '../../../styles/Sidebar.module.scss'
import getRecipientEmail from '../../../utils/getRecipientEmail'
import {useRouter} from 'next/router'

const Chat = ({id, users}) => {
    const router = useRouter()
    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==',  getRecipientEmail(users, user)))

    const RecipientEmail = getRecipientEmail(users, user);
    const enterChat = ()=>{
        router.push(`/chat/${id}`)
    }
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    return (
        
        <>
        <button className={` ${styles.profile}`} key={id} onClick={enterChat}>
           <div className={styles.p1} style={{        
                        backgroundImage: `url(${recipient ? recipient?.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '50%',
                        border: '2px solid #4DC591'
        }}></div>
                    <div className={styles.profileName}>
                        <h4>{RecipientEmail}</h4>
                    </div>
                </button> 
        </>
    )
}

export default Chat
