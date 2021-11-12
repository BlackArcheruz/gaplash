import styles from '../../../styles/Sidebar.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSearch, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import * as EmailValidator from 'email-validator'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import {auth, db} from '../../../firebase'
import Chat from '../Chat/Chat';

const Sidebar = () => {
    const [user] = useAuthState(auth);

    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);

    const [chatsSnapshot] = useCollection(userChatRef);

    const createChat = ()=>{
        const input = prompt('Gaplashmoqchi bo`lgan odamingizni Emailini yozing:');

        if(!input) return null;

        if(EmailValidator.validate(input) && !chatAlreadyExist(input) && input !== user.email){
            db.collection('chats').add(
                {
                    users: [user.email, input],
                }
            )
        }
    }

    const chatAlreadyExist = (emailRecipient)=> {return !!chatsSnapshot?.docs.find(chat => chat.data().users.find(user=> user === emailRecipient)?.length > 0)}



    return (
        <div className={styles.sidebar}>
        <div className={styles.container}>
            <div>
            <Link href="/">
                <a>
            <div className={styles.img}></div>
            </a>
            </Link>
            <div className={`${styles.search} ${styles.my1} ${styles.p1}`}>
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                <input type="text" placeholder="Search People..." />
            </div>
            <div className={styles.new_chat}>
            <button className={styles.button_chat} onClick={createChat}>Yangi chat</button>
            </div>
            
            <div className={`${styles.my1} ${styles.profiles}`}>
                
                
            {chatsSnapshot?.docs.map(chat=>(
                <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
                    ))}
               
                
            </div>
            </div>
            <div className={styles.settings}>
                <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faPenSquare}></FontAwesomeIcon>
            </div>
        </div>
        </div>
    )
}

export default Sidebar
