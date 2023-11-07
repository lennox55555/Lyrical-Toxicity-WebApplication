expandRequestSection();

function apiRequest() {
    const songInput = document.getElementById('song');
    const artistInput = document.getElementById('artist');
    const albumInput = document.getElementById('album');
    const dropdown = document.getElementById('dropdown');
    console.log(dropdown.value)

    const func = dropdown.value;

    const resultDiv = document.getElementById('result');

    if (func === 'songSentiment') {
        const song = songInput.value;
        const artist = artistInput.value;
        const apiUrl = `https://yajjcjryrg7vfihndc4vxv5hve0pljlx.lambda-url.us-east-1.on.aws/songWokeApi?song=${song}&artist=${artist}&func=${func}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                // Insert the data into the result div
                resultDiv.textContent = `${data.ans}`;
                console.log(data); // Log the response
            })
            .catch(error => {
                resultDiv.textContent = `Error: ${error.message}`;
                console.error(error); // Log the error
            });
    }

    else if (func === 'albumSentiment') {
        const album = albumInput.value;
        const artist = artistInput.value;
        const apiUrl = `https://yajjcjryrg7vfihndc4vxv5hve0pljlx.lambda-url.us-east-1.on.aws/songWokeApi?album=${album}&artist=${artist}&func=${func}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                // Insert the data into the result div
                resultDiv.textContent = `${data.ans}`;
                console.log(data); // Log the response
            })
            .catch(error => {
                resultDiv.textContent = `Error: ${error.message}`;
                console.error(error); // Log the error
            });
    }

    else if (func === 'artistSentiment') {
        const artist = artistInput.value;
        const apiUrl = `https://yajjcjryrg7vfihndc4vxv5hve0pljlx.lambda-url.us-east-1.on.aws/songWokeApi?artist=${artist}&func=${func}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                // Insert the data into the result div
                resultDiv.textContent = `${data.ans}`;
                console.log(data); // Log the response
            })
            .catch(error => {
                resultDiv.textContent = `Error: ${error.message}`;
                console.error(error); // Log the error
            });
    }

}


function expandSection(section) {
    document.querySelectorAll('.section').forEach(s => s.style.flex = '1');
    document.querySelector(`.${section}`).style.flex = '6';
}

function resetSections() {
    document.querySelectorAll('.section').forEach(s => s.style.flex = '1');
}

const form = document.getElementById('myForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting in the traditional way
    const dropdownValue = document.getElementById('dropdown').value;
    resultDiv.innerHTML = `Dropdown Value: ${dropdownValue}`;
});

function expandRequestSection() {
    const requestSection = document.getElementById('requestSection');
    requestSection.style.flex = '6';
}


// JavaScript function to refresh the page
function refreshPage() {
    location.reload();
}

function selectOption() {
    const dropdown = document.getElementById('dropdown');
    const inputFields = document.getElementById('inputFields');

    inputFields.innerHTML = ''; // Clear previous input fields

    if (dropdown.value === 'songSentiment') {
        // Create two input boxes labeled song and artist
        inputFields.innerHTML = `
                <label for="song">Song:</label>
                <input type="text" id="song" name="song" placeholder="Enter song name">
                <br>
                <label for="artist">Artist:</label>
                <input type="text" id="artist" name="artist" placeholder="Enter artist name">
            `;
    } else if (dropdown.value === 'albumSentiment') {
        // Create two input boxes labeled album name and artist
        inputFields.innerHTML = `
                <label for="album">Album Name:</label>
                <input type="text" id="album" name="album" placeholder="Enter album name">
                <br>
                <label for="artist">Artist:</label>
                <input type="text" id="artist" name="artist" placeholder="Enter artist name">
            `;
    } else if (dropdown.value === 'artistSentiment') {
        // Create one input labeled artist
        inputFields.innerHTML = `
                <label for="artist">Artist:</label>
                <input type="text" id="artist" name="artist" placeholder="Enter artist name">
            `;
    }
}