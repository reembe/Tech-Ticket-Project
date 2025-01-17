//import statements
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
//firebase stuff
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
const db = getFirestore(app)

//elements
const nameEl = document.getElementById("name-el")
const emailEl = document.getElementById("email-el")
const roomNumberEl = document.getElementById("room-number-el")
const deviceTypeEl = document.getElementById("device-type-el")
const deviceNumberEl = document.getElementById("device-number-el")
const selectEl = document.getElementById("select-el")
const incidentDateEl = document.getElementById("incident-date-el")
const additionalInfoEl = document.getElementById("additional-info-el")
const submitEl = document.getElementById("submit-el")
const logoutEl = document.getElementById("logout-el")

const nameSubmitEl = document.getElementById("name-submit-el")
const emailSubmitEl = document.getElementById("email-submit-el")
const roomNumberSubmitEl = document.getElementById("room-number-submit-el")
const deviceTypeSubmitEl = document.getElementById("device-type-submit-el")
const deviceNumberSubmitEl = document.getElementById("device-number-submit-el")
const selectSubmitEl = document.getElementById("select-submit-el")
const incidentDateSubmitEl = document.getElementById("incident-date-submit-el")
const additionalInfoSubmitEl = document.getElementById("additional-info-submit-el")

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")
const viewSubmitted = document.getElementById("form-completed-view")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

submitEl.addEventListener("click", addPostToDB)
signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)
logoutEl.addEventListener("click", showLoggedOutView)

//main

showLoggedOutView()

onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      showLoggedInView()
    } else {
      showLoggedOutView()
    }
});

//functions

function authSignInWithEmail() {
    console.log("Sign in with email and password")

    const email = emailInputEl.value
    const password = passwordInputEl.value

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            showLoggedInView()
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
            const user = userCredential.user;
            showLoggedInView()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " " + errorMessage)
        });
}


async function addPostToDB() {
   try {
    const name = nameEl.value
    const email = emailEl.value
    const roomNumber = roomNumberEl.value
    const deviceType = deviceTypeEl.value
    const deviceNumber = deviceNumberEl.value
    const select = selectEl.value
    const incidentDate = incidentDateEl.value
    const additionalInfo = additionalInfoEl.value

    showSubmittedView(name, email, roomNumber, deviceType, deviceNumber, select, incidentDate, additionalInfo)

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

function showLoggedOutView() {
    hideView(viewSubmitted)
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
}
 
 
function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
}

function showSubmittedView(name, email, roomNumber, deviceType, deviceNumber, select, incidentDate, additionalInfo) {
    hideView(viewLoggedIn)
    showView(viewSubmitted)

    nameSubmitEl.innerHTML = "Name: " + name
    emailSubmitEl.innerHTML = "Email: " + email
    roomNumberSubmitEl.innerHTML = "Room Number: " + roomNumber
    deviceTypeSubmitEl.innerHTML = "Device Type: " + deviceType
    deviceNumberSubmitEl.innerHTML = "Device Number: " + deviceNumber
    selectSubmitEl.innerHTML = "Reason: " + select
    incidentDateSubmitEl.innerHTML = "Incident Date: " + incidentDate
    additionalInfoSubmitEl.innerHTML = "Additional Info: " + additionalInfo
}
 
 
function showView(view) {
    view.style.display = "flex"
}
 
 
function hideView(view) {
    view.style.display = "none"
}

submitEl.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default form submission
    
});
