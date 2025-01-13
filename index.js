//imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

//firebase stuff
const appSettings = {
    databaseURL:"https://techsupport-d9459-default-rtdb.firebaseio.com/"
}
const database = getDatabase()
const app = initializeApp(appSettings)
const tickets = ref(database, "tickets")
//elements
const nameEl = document.getElementById("name-el")
const emailEl = document.getElementById("email-el")
const roomNumberEl = document.getElementById("room-number-el")
const deviceTypeEl = document.getElementById("device-type-el")
const deviceNumberEl = document.getElementById("device-number-el")
const reasonEl = document.getElementById("reason-el")
const selectEl = document.getElementsById("select-el")
const incidentDateEl = document.getElementById("incident-date-el")
const additionalInfoEl = document.getElementById("additional-info-el")
const submitEl = document.getElementById("submit-el")

//functions
addButtonEl.addEventListener("click", function() {
    let name = nameEl.value
    let email = emailEl.value
    let roomNumber = roomNumberEl.value
    let deviceType = deviceTypeEl.value
    let deviceNumber = deviceNumberEl.value
    let reason = reasonEl.value
    let select = selectEl.value
    let incidentDate = incidentDateEl.value
    let additionalInfo = additionalInfoEl.value
    let submit = submitEl.value
})