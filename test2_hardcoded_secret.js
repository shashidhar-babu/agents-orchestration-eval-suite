const API_KEY = "sk-prod-abc123secretkey";

function renderComment(userInput) {
    document.getElementById("comment").innerHTML = userInput;
}

function fetchData() {
    return fetch("https://api.example.com/data?key=" + API_KEY);
}
