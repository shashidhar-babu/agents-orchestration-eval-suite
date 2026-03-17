```javascript
// Server-side code to fetch data
app.get('/fetch-data', (req, res) => {
    const apiKey = process.env.API_KEY; // Store API key in environment variable
    fetch(`https://api.example.com/data?key=${apiKey}`)
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(error => res.status(500).send(error));
});

function renderComment(userInput) {
    const commentElement = document.getElementById("comment");
    commentElement.innerHTML = sanitizeHTML(userInput);
}

function sanitizeHTML(str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

async function fetchData() {
    try {
        const response = await fetch("https://api.example.com/data?key=" + apiKey);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
```