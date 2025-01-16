import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
import { addDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
import { collection } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"

//firebase stuff
const firebaseConfig = {
    apiKey: "AIzaSyBUac8dpJe65YaBeE4YOIvq-Zk0Dw1TB9c",
    authDomain: "techticket-9ff59.firebaseapp.com",
    projectId: "techticket-9ff59",
    storageBucket: "techticket-9ff59.firebasestorage.app",
    messagingSenderId: "837694732453",
    appId: "1:837694732453:web:78ef6e66aecb06dc4df54c"
  };

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
        const docRef = await addDoc(collection(db, "Tickets"), {
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
