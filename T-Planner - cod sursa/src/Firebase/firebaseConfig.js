import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDt-5FGCSKYYpsLBye4eCCgOlb59kKCrpA",
    authDomain: "trainings-management.firebaseapp.com",
    databaseURL: "https://trainings-management.firebaseio.com",
    projectId: "trainings-management",
    storageBucket: "trainings-management.appspot.com",
    messagingSenderId: "884235430371",
    appId: "1:884235430371:web:644be162d7dc1dbd"
};
// const adminConfig = {
//     "type": "service_account",
//     "project_id": "trainings-management",
//     "private_key_id": "95c3f1c91f2be39c99e4d2c01df41ed25735e9b4",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCdzgmKIuF1ygEJ\nt7eOUl1qLcD/7v11Vpt8VPvjkGFDT7w1dmLATLkJYxOHH5VyNHBRo7ZwRaDSiQnu\n2FvRMTNBd888S9ZyJScoYwK0JglDNRSf6RNRFgvqdIZKuXXxvChAQ0np7ydHYxnf\nJmndSjmjwdFwRkKeYXtR4iqGLVc5MxImLI6OPgGbcKz3xpDgqQssg3OoK4VqtkFx\nZqvdWwRNL9qU35dJpIl99NWiNhlImS8oDudqV4LRzOz9lU+L/wATXm8izoMPlHLV\n9+3Q4OY5eiv0CydHHcMxZYbJXrEoFim+4fnjS5NNtyBlAMQVfDs+mP6/Re0h2VGg\nphcIzYjxAgMBAAECggEALMFRrU7FON3ou3PSaFftzH5bfXqvgcblZDbKFblODIQh\nsdv4l+dql0H1ON55SSGcNVtEE8V7nhplqcrNB6B3k/rB2Kz9jfQBjg++pY8gE2KL\njerRoq6pBH61052T2NJvbAJphSJhtnphzQsc/Tje7hW7K6eRn0+wZQHK47EaSstC\nN/Q2gMgzfnLB/7058hioZBv44XzGkk6tiQjYnjyXNnVDEG+K/V77naZArHZihL0U\nMTrQc/MAxDAF3ScGA3aA+JoyVkO65t+8DH+kG7MrID9fidYQZbc7586LTQWi6Ass\nV/Fegtuq716EhlJpgpCAiHIMMdz4YYES0Djwr98NPQKBgQDKz73Q1+oh92npW+q4\nUfZG8ea84VKVh7J72UT32Q2pwGyKA0gf6CNeh3K4C7+2e4bH1SXZVSVSwp7KpLuI\nA1Dz1FFPCzRAwx59TRBiOiUjcF1AX04hvnOBY/v9p3E64uADGnc+UN13fnHeJ6Si\ngHM7rQHE/re9v69+A3MuaedXEwKBgQDHMKkwCuJy1pyGuZsBtPchGpzBY7MoHv41\nrvZPHTqBhuchm1Ij//pUZbpDkGNBYsppqTnhNqF6YEru1VjVbJpt07cnmx7kLdIa\nHOL22Uf1lrXfg06glI5pwetYaM391Ex/0j5uqPlifhX6LmOx5Y1lwHdcE2z5kMdp\n5tVET4PMawKBgQCYdlE4lYgCHs90yU+LXrooHSObLDv8AvXPGsc5Fuepi+lMWyk2\nKzmjj2lTKCnn0bbBtN9uIQ8cxwe+SNZdajjKA/tX05FlegkKowtE/Hb8zDSd9sdy\noIyOYY6G4gBCB1nlm1i29O14LgsFuYGPU8bMvsNMxztzno0byxYkdyKdFwKBgBFg\nQFINkQV9jTf/dvMmKyy7GpOQM++7DGf4dEogfZsQ/pai6v5y9Q5ptV7xeIcarBed\niIwJ7Po07jR5bf9oMuyDvIV69a3oBVz7yhzIhYt58zGlTbWaX/X/0Zzrv5R18Zpw\n57tViDO8VgR2CYJaSQRoTsE8fJQkuhCV72K/IPszAoGBAIJzyZKA3RiLHEfhXl9I\n84GjvdeUjkDtlbCeFD9u3DtXGRxkC1zT6unk2WJSiWzBIhBQjtwzKPdAXO7Zw5z2\nagM+1i0m89bFTYD8FIWCaaafbcuxapP4khwmAtnvqkpZbR4XVqodqX4NbAnO2khf\nLeEqsDubl0bOL1icC+zTr6Cs\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-ozq74@trainings-management.iam.gserviceaccount.com",
//     "client_id": "112131888926350124137",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ozq74%40trainings-management.iam.gserviceaccount.com"
//   }
  

class Firebase {
    constructor() {
      app.initializeApp(firebaseConfig);
  
      /* Helper */
  
      this.serverValue = app.database.ServerValue;
    //   this.emailAuthProvider = app.auth.EmailAuthProvider;
  
      /* Firebase APIs */
  
      this.auth = app.auth();
      this.db = app.database();
      this.storage = app.storage();
  
      /* Social Sign In Method Provider */
  
    //   this.googleProvider = new app.auth.GoogleAuthProvider();
    //   this.facebookProvider = new app.auth.FacebookAuthProvider();
    //   this.twitterProvider = new app.auth.TwitterAuthProvider();
    }
  
    // *** Auth API ***
  
    createUserWithEmailAndPassword = (email, password) => {
        return this.auth.createUserWithEmailAndPassword(email, password);
    }

    loginUserWithEmailAndPassword = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password);
    }
  
    // doSignInWithGoogle = () =>
    //   this.auth.signInWithPopup(this.googleProvider);
  
    // doSignInWithFacebook = () =>
    //   this.auth.signInWithPopup(this.facebookProvider);
  
    // doSignInWithTwitter = () =>
    //   this.auth.signInWithPopup(this.twitterProvider);
  
    logout = () => this.auth.signOut();
  
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  
    doSendEmailVerification = () =>
      this.auth.currentUser.sendEmailVerification({
        url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      });
  
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);
  
    // *** Merge Auth and DB User API *** //
  
    onAuthUserListener = (next, fallback) =>
      this.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          this.user(authUser.uid)
            .once('value')
            .then(snapshot => {
              const dbUser = snapshot.val();
  
              // default empty roles
              if (!dbUser.roles) {
                dbUser.roles = [];
              }
  
              // merge auth and db user
              authUser = {
                uid: authUser.uid,
                email: authUser.email,
                // emailVerified: authUser.emailVerified,
                // providerData: authUser.providerData,
                ...dbUser,
              };
  
              next(authUser);
            });
        } else {
          fallback();
        }
      });
  
    // *** User API ***
  
    user = uid => this.db.ref(`users/${uid}`);
  
    users = () => this.db.ref('users');
  
    // *** Message API ***
  
    message = uid => this.db.ref(`messages/${uid}`);
  
    messages = () => this.db.ref('messages');

    // *** Course API ***
    courses = () => this.db.ref('courses');

    course = (courseId) => this.db.ref(`courses/${courseId}`);

    // *** Arias API ***

    aria = (ariaId) => this.db.ref(`arias/${ariaId}`);

    arias = () => this.db.ref('/arias');

    // *** attendance API ***

    attendees = (courseId, sessionId) => this.db.ref(`/courses/${courseId}/attendance/${sessionId}/attendees`);

    // *** feedback API *

    courseFeedback = (courseId) => this.db.ref(`courses/${courseId}/feedback`);

    feedback = () => this.db.ref('/feedback');
    

  }
  
  export default Firebase;
