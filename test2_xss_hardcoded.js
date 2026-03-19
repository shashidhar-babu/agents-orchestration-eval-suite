const DOMPurify = require("dompurify");

function renderUserProfile(user) {
  const sanitizedBio = DOMPurify.sanitize(user.bio);
  document.getElementById("profile").innerHTML = sanitizedBio;
}

function getApiKey() {
  return process.env.API_KEY;
}

function fetchData(endpoint) {
  const apiKey = getApiKey();
  return fetch(endpoint, {
    headers: { "Authorization": "Bearer " + apiKey }
  });
}
