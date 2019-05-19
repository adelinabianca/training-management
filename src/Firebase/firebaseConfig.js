import app from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDt-5FGCSKYYpsLBye4eCCgOlb59kKCrpA",
    authDomain: "trainings-management.firebaseapp.com",
    databaseURL: "https://trainings-management.firebaseio.com",
    projectId: "trainings-management",
    storageBucket: "trainings-management.appspot.com",
    messagingSenderId: "884235430371",
    appId: "1:884235430371:web:644be162d7dc1dbd"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
    }

    createUserWithEmailAndPassword = (email, password) => {
        return this.auth.createUserWithEmailAndPassword(email, password);
    }

    loginUserWithEmailAndPassword = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    getCurrentUser = () => {
        return this.auth.currentUser;
    }

    logout = () => this.auth.signOut();
}

export default Firebase;
