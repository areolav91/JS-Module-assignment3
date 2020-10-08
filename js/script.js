import displayMessage from "./components/message.js";
import { saveToken, saveUser } from "./components/storage.js";
import { baseUrl } from "./components/url.js";

const loginForm = document.querySelector("form");
const userId = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-box");

loginForm.addEventListener("submit", submitloginForm);

function submitloginForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const usernameValue = userId.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue.length === 0 || passwordValue.length === 0) {
        return displayMessage("warning", "Error - Wrong values", ".message-box");
    }

    driveLogin(usernameValue, passwordValue);
}

async function driveLogin(username, password) {
    const url = baseUrl + "auth/local";

    const data = JSON.stringify({ identifier: username, password: password });

    const choice = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const feedback = await fetch(url, choice);
        const json = await feedback.json();

        console.log(json);

        if (json.user) {

            saveToken(json.jwt);
            saveUser(json.user);

            location.href = "https://www.noroff.no/index.php";
        }

        if (json.error) {
            displayMessage("warning", "Wrong details - please check your login details", ".message-box");
        }
    } catch (error) {
        console.log(error);
    }
}