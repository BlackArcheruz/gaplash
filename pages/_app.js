import '../styles/globals.css'
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase'
import firebase from 'firebase'
import { useEffect } from 'react';
import Loading from './Loading';
import Login from './login'

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(()=>{
    if(user){
      db.collection('users').doc(user.uid).set({
        email: user.email,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: user.photoURL
      }, {merge: true})
    }
  }, [user])

  if(loading) return <Loading/>
  if(!user) return <Login/>

  return <Component {...pageProps} />
}

export default MyApp
