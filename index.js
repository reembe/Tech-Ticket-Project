// //imports
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// import { ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
// import { push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
// import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

// //firebase stuff
// const appSettings = {
//     databaseURL:"https://techsupport-d9459-default-rtdb.firebaseio.com/"
// }
// const database = getDatabase()
// const app = initializeApp(appSettings)
// const tickets = ref(database, "tickets")
// //elements
// const nameEl = document.getElementById("name-el")
// const emailEl = document.getElementById("email-el")
// const roomNumberEl = document.getElementById("room-number-el")
// const deviceTypeEl = document.getElementById("device-type-el")
// const deviceNumberEl = document.getElementById("device-number-el")
// const reasonEl = document.getElementById("reason-el")
// const selectEl = document.getElementsById("select-el")
// const incidentDateEl = document.getElementById("incident-date-el")
// const additionalInfoEl = document.getElementById("additional-info-el")
// const submitEl = document.getElementById("submit-el")

// //functions
// addButtonEl.addEventListener("click", function() {
//     let name = nameEl.value
//     let email = emailEl.value
//     let roomNumber = roomNumberEl.value
//     let deviceType = deviceTypeEl.value
//     let deviceNumber = deviceNumberEl.value
//     let reason = reasonEl.value
//     let select = selectEl.value
//     let incidentDate = incidentDateEl.value
//     let additionalInfo = additionalInfoEl.value
//     let submit = submitEl.value
// })


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://techsupport-d9459-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const tickets = ref(database, "tickets");

const nameEl = document.getElementById("name-el");
const emailEl = document.getElementById("email-el");
const roomNumberEl = document.getElementById("room-number-el");
const deviceTypeEl = document.getElementById("device-type-el");
const deviceNumberEl = document.getElementById("device-number-el");
const reasonEl = document.getElementById("reason-el");
const selectEl = document.getElementById("select-el");
const incidentDateEl = document.getElementById("incident-date-el");
const additionalInfoEl = document.getElementById("additional-info-el");
const submitEl = document.getElementById("submit-el");
const formEl = document.querySelector(".ticket-form");
const headerEl = document.querySelector(".header");

function sendEmail(userEmail) {
    emailjs.init("Wt6IpLBrlaehjHvgn");

    const emailParams = {
        to_email: userEmail,
        message: "Your request has been received.",
    };

    emailjs.send("service_25xbc1h", "template_13cmz8x", emailParams)
        .then((response) => {
            console.log("Email sent successfully!", response);
        })
        .catch((error) => {
            console.error("Error sending email: ", error);
        });
}

submitEl.addEventListener("click", function (event) {
event.preventDefault(); 

    const ticketData = {
        name: nameEl.value,
        email: emailEl.value,
        roomNumber: roomNumberEl.value,
        deviceType: deviceTypeEl.value,
        deviceNumber: deviceNumberEl.value,
        reason: reasonEl.value,
        select: selectEl.value,
        incidentDate: incidentDateEl.value,
        additionalInfo: additionalInfoEl.value,
    };

    console.log("Ticket Data:", ticketData);

    push(tickets, ticketData)
        .then(() => {
            console.log("Firebase success");
            sendEmail(ticketData.email);

            formEl.style.display = "none";
            headerEl.innerHTML = "<h1>Thank you for submitting!</h1>";
        })
        .catch((error) => {
            console.error("Error Firebase: ", error);
        });
});
