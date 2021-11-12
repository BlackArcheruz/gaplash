import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db} from '../../../firebase'
import styles from '../../../styles/Chat.module.scss'
import Mesage from '../Mesage/Mesage';
import firebase from 'firebase/app'

function ChatScreen() {
    const [user] = useAuthState(auth);
    const [input, setInput] = useState('')
    const router = useRouter();
    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp','asc'));


    const showMessages = ({chat, messages})=>{
        if(messagesSnapshot){
            return messagesSnapshot.docs.map((message)=>(
                <Mesage
                    key={message.id}
                    user={message.user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime()
                    }}
                />
            ))
        } else{
            return JSON.parse(messages).map((message)=>(
                <Mesage key={message.id} user={message.user} message={message}/>
            )) 
        } null
    }
    const sendMessage = (e)=>{
        e.preventDefault();

        setInput('');

        db.collection('users').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        },{merge: true});

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL
        })
    }
    return (
        <div className={styles.chat_container}>
            <div className={styles.chat_header}>
            <div className={styles.p1} style={{        
                        backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '50%',
                        border: '2px solid #4DC591',
                        width: '48px',
                        height: '48px'
        }}></div>
        <div>
        <h3>Rec Email</h3>
        <p>last seen ...</p>
        </div>
            </div>
            <div className={styles.message_container}>
            {showMessages}
        </div>
        <form className={styles.input_container}>
            <input type="text" placeholder="xabar yozing..." className={styles.input} value={input} onChange={(e)=>setInput(e.target.value)}/>
            <button hidden disabled={!input} type="submit" onClick={sendMessage}>yuborish</button>
        </form>
        </div>
    )
}

export default ChatScreen
