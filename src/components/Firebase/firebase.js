import app from 'firebase/app';
//* Allows for user authentication + authorization
import 'firebase/auth';
//* Allows for firebase database usage
import 'firebase/database';

const config = {
	apiKey: 'AIzaSyB9s2uDyjOTf4z-pJ7fFqtAOK1k7LyaGJA',
	authDomain: 'variety-game-box.firebaseapp.com',
	databaseURL: 'https://variety-game-box.firebaseio.com',
	projectId: 'variety-game-box',
	// storageBucket: "variety-game-box.appspot.com",
	messagingSenderId: '730872160170'
	// appId: "1:730872160170:web:c82dc9c4a7a5151b8695d3",
	// measurementId: "G-2BJJ6MK4R8"
};

class Firebase {
	constructor() {
		app.initializeApp(config);

		this.auth = app.auth();
		this.db = app.database();
	}

	// * Authentication API
	doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
	doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
	doSignOut = () => this.auth.signOut();
	doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);
	doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);

	// * User API
	user = (uid) => this.db.ref(`users/${uid}`);
	users = () => this.db.ref('users');
}

export default Firebase;
