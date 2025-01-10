import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL:"https://techsupport-d9459-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)