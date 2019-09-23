import app from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';


const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
        this.realdb = app.database();
    }
    uploadPostImage = (file) => {
        return new Promise((resolve, reject) => {
            const uploadTask = this.storage.ref(`images/${file.name}`).put(file);
            uploadTask.then(
                () => {
                    this.storage.ref('images').child(file.name).getDownloadURL().then((url) => resolve(url))
                }
            ).catch(() => {
                reject('error')
            })
        })
    };
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);
    doSignOut = () => this.auth.signOut();

    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');
};

export default Firebase;