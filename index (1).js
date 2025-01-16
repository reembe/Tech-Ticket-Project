/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
import { signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
import { collection } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
import { addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
import { serverTimestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
/* === Firebase Setup === */
const firebaseConfig = {
    apiKey: "AIzaSyBUac8dpJe65YaBeE4YOIvq-Zk0Dw1TB9c",
    authDomain: "techticket-9ff59.firebaseapp.com",
    projectId: "techticket-9ff59",
    storageBucket: "techticket-9ff59.firebasestorage.app",
    messagingSenderId: "837694732453",
    appId: "1:837694732453:web:78ef6e66aecb06dc4df54c"
};

const app= initializeApp(firebaseConfig)
const auth = getAuth(app)
console.log(auth)
const db = getFirestore(app)
console.log(db)

/* === UI === */

/* == UI - Elements == */
const nameEl = document.getElementById("name-el")
const emailEl = document.getElementById("email-el")
const roomNumberEl = document.getElementById("room-number-el")
const deviceTypeEl = document.getElementById("device-type-el")
const deviceNumberEl = document.getElementById("device-number-el")
const selectEl = document.getElementById("select-el")
const incidentDateEl = document.getElementById("incident-date-el")
const additionalInfoEl = document.getElementById("additional-info-el")
const submitEl = document.getElementById("submit-el")

const textareaEl = document.getElementById("post-input")
const postButtonEl = document.getElementById("post-btn")

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const signOutButtonEl = document.getElementById("sign-out-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

const userProfilePictureEl = document.getElementById("user-profile-picture")
const userGreetingEl = document.getElementById("user-greeting")
/* == UI - Event Listeners == */
postButtonEl.addEventListener("click", addPostToDB)

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
signOutButtonEl.addEventListener("click", authSignOut)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

/* === Main Code === */

showLoggedOutView()
console.log(app.options.projectId)

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      showLoggedInView()
    } else {
      // User is signed out
      showLoggedOutView()
    }
});

/* === Functions === */
function showProfilePicture(imgElement, user) {
    if(user.photoURL) {
        imgElement.src = user.photoURL
    }
}

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    console.log("Sign in with Google")
}

function authSignInWithEmail() {
    console.log("Sign in with email and password")

    const email = emailInputEl.value
    const password = passwordInputEl.value

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //Signed in
            const user = userCredential.user
            showLoggedInView()
            showUserGreeting(userGreetingEl, user)
            showProfilePicture(userProfilePictureEl, user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " " + errorMessage)
        })

}

function authCreateAccountWithEmail() {
    console.log("Sign up with email and password")

    const email = emailInputEl.value
    const password = passwordInputEl.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            showLoggedInView()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " " + errorMessage)
        });
}

function authSignOut() {
    signOut(auth).then(() => {
        //Sign-out successful
        showLoggedOutView()
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + " " + errorMessage)
    })
}

/* = Functions - Firebase - Cloud Firestore = */


async function addPostToDB() {
   try {
    let name = nameEl.value
    let email = emailEl.value
    let roomNumber = roomNumberEl.value
    let deviceType = deviceTypeEl.value
    let deviceNumber = deviceNumberEl.value
    let select = selectEl.value
    let incidentDate = incidentDateEl.value
    let additionalInfo = additionalInfoEl.value

    const docRef = await addDoc(collection(db, "Tickets"), {
        
        createdAt: await serverTimestamp(),
        name: name,
        email: email,
        roomNumber: roomNumber,
        deviceType: deviceType,
        deviceNumber: deviceNumber,
        select: select,
        incidentDate: incidentDate,
        additionalInfo: additionalInfo,

    })
    console.log("Document written with ID: ", docRef.id)
   } catch(e) {
    console.error("Error adding document: ", e)
   }
}
 

/* == Functions - UI Functions == */
 

function showLoggedOutView() {
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
}
 
 
function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
}
 
 
function showView(view) {
    view.style.display = "flex"
}
 
 
function hideView(view) {
    view.style.display = "none"
}
//credit: coursera