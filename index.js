import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
import { addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
import { collection } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"

//firebase stuff
const firebaseConfig = {
    apiKey: "AIzaSyBqNOavW-oa6P_D2HAlnQGswYcdGw4Cvyw",
    authDomain: "techsupport-d9459.firebaseapp.com",
    databaseURL: "https://techsupport-d9459-default-rtdb.firebaseio.com",
    projectId: "techsupport-d9459",
    storageBucket: "techsupport-d9459.firebasestorage.app",
    messagingSenderId: "187298409804",
    appId: "1:187298409804:web:2956c996f9fe3e9f56f3e9"
}
;
const app = initializeApp(firebaseConfig)
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


//functions
submitEl.addEventListener("click", addPostToDB)

async function addPostToDB() {
    console.log("button pressed")
    let name = nameEl.value
    let email = emailEl.value
    let roomNumber = roomNumberEl.value
    let deviceType = deviceTypeEl.value
    let deviceNumber = deviceNumberEl.value
    let select = selectEl.value
    let incidentDate = incidentDateEl.value
    let additionalInfo = additionalInfoEl.value
    let submit = submitEl.value
    console.log("AAAAAAAA")

    try {
        const docRef = await addDoc(collection(db, "tickets"), {
            name: name,
            email: email,
            roomNumber: roomNumber,
            deviceType: deviceType,
            deviceNumber: deviceNumber,
            select: select,
            incidentDate: incidentDate,
            additionalInfo: additionalInfo,
            submit: submit
        })
        console.log("Document written with ID: ", docRef.id)
    } catch(e) {
        console.error("Error adding document: ", e)
    }
}