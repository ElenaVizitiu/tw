import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDu6XJ2hiIHC8dQLv9PyPxuII-KBh6PT40",
    authDomain: "tw-team.firebaseapp.com",
    databaseURL: "https://tw-team.firebaseio.com",
    projectId: "tw-team",
    storageBucket: "tw-team.appspot.com",
    messagingSenderId: "384211732667"
};

export const firebaseApp = firebase.initializeApp(config);