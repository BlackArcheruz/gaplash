import Sidebar from '../components/Sidebar/Sidebar'
import styles from '../../styles/Chat.module.scss'
import Head from 'next/head'
import ChatScreen from '../components/Chat Screen/ChatScreen'
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import getRecipientEmail from '../../utils/getRecipientEmail'

const Chat = ({chat, messages})=>{
    const [user] = useAuthState(auth);

    return(
        <div className={styles.container}>
            <Head>
                <title>Gaplash | {getRecipientEmail(chat.users,user)} Chat</title>
            </Head>
        <Sidebar/>
        <div className={styles.chat_container}>
            <ChatScreen chat={chat} messages={messages}/>
        </div>
        </div>
    )
}

export async function getServerSideProps(context){
    const ref = db.collection('chats').doc(context.query.id);
    const messageRes = await ref.collection('messages').orderBy('timestamp', 'asc').get();
    
    const messages = await messageRes.docs.map(doc=>({
        id: doc.id,
        ...doc.data()
    })).map(messages=>({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }))

    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }

    return {
        props:{
            messages: JSON.stringify(messages),
            chat: chat
        }
    }
}

export default Chat