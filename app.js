expandRequestSection();

function apiRequest() {
    const songInput = document.getElementById('song');
    const artistInput = document.getElementById('artist');
    const albumInput = document.getElementById('album');
    const dropdown = document.getElementById('dropdown');

    const func = dropdown.value;

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
                const imageElement = document.createElement('img');

                const title = document.getElementById("title");

                const subtitle = document.getElementById("subtitle");

                const lyrics = document.getElementById("body");

                imageElement.src = data.ans[2];

                title.textContent = data.ans[0];

                subtitle.textContent = data.ans[1];

                lyrics.textContent = data.ans[3];

                imageElement.style.width = "200px";

                const imageContainer = document.getElementById('image-container');

                imageElement.style.width = "200px";

                imageContainer.style.textAlign = "center";

                imageContainer.appendChild(imageElement);

            })
            .catch(error => {
                console.error(error);
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
                const imageElement = document.createElement('img');

                const title = document.getElementById("title");

                const subtitle = document.getElementById("subtitle");

                imageElement.src = data.ans[2];

                title.textContent = data.ans[1];

                subtitle.textContent = data.ans[0];

                imageElement.style.width = "200px";

                for (let i = 0; i < data.ans[3].length; i++) {
                    let songElement = document.createElement('p');
                    songElement.textContent = data.ans[3][i];

                    songList.appendChild(songElement);
                }

                const imageContainer = document.getElementById('image-container');

                imageElement.style.width = "200px";

                imageContainer.style.textAlign = "center";

                imageContainer.appendChild(imageElement);
            })
            .catch(error => {
                console.error(error);
            });
    }

    else if (func === 'artistSentiment') {
        const artist = artistInput.value;
        const apiUrl = `https://yajjcjryrg7vfihndc4vxv5hve0pljlx.lambda-url.us-east-1.on.aws/songWokeApi?artist=${artist}&func=${func}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Could not Find Album' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const imageElement = document.createElement('img');

                const title = document.getElementById("title");

                const subtitle = document.getElementById("subtitle");

                imageElement.src = data.ans[3];

                title.textContent = data.ans[0];

                subtitle.textContent = data.ans[2];

                imageElement.style.width = "175px";

                const imageContainer = document.getElementById('image-container');

                imageContainer.style.textAlign = "center";

                imageContainer.appendChild(imageElement);

                const songList = document.getElementById('songList');

                for (let i = 4; i < data.ans.length; i++) {
                    const songName = data.ans[i][0];
                    const songLink = data.ans[i][1];

                    const songElement = document.createElement('p');
                    songElement.textContent = songName;

                    songList.appendChild(songElement);

                    if (songLink !== null) {
                        let audioUrl = songLink;
                        const audio = new Audio(audioUrl);

                        const playButton = document.createElement('button');
                        playButton.textContent = "Play Audio";

                        playButton.addEventListener("click", () => {
                            if (audio.paused) {
                                audio.play();
                                playButton.textContent = "Pause Audio";
                            } else {
                                audio.pause();
                                playButton.textContent = "Play Audio";
                            }
                        });

                        songElement.appendChild(playButton);
                    }
                }

            })
            .catch(error => {
                console.error(error);
            });
    }

}


function expandSection(section) {
    document.querySelectorAll('.section').forEach(s => s.style.flex = '1');
    document.querySelector(`.${section}`).style.flex = '6';
}

const form = document.getElementById('myForm');


form.addEventListener('submit', function (e) {
    e.preventDefault();

});

function expandRequestSection() {
    const requestSection = document.getElementById('requestSection');
    requestSection.style.flex = '6';
}


function refreshPage() {
    location.reload();
}

function selectOption() {
    const dropdown = document.getElementById('dropdown');
    const inputFields = document.getElementById('inputFields');

    inputFields.innerHTML = '';

    if (dropdown.value === 'songSentiment') {
        inputFields.innerHTML = `
                <label for="song">Song:</label>
                <input type="text" id="song" name="song" placeholder="Enter song name">
                <br>
                <label for="artist">Artist:</label>
                <input type="text" id="artist" name="artist" placeholder="Enter artist name">
            `;
    } else if (dropdown.value === 'albumSentiment') {
        inputFields.innerHTML = `
                <label for="album">Album Name:</label>
                <input type="text" id="album" name="album" placeholder="Enter album name">
                <br>
                <label for="artist">Artist:</label>
                <input type="text" id="artist" name="artist" placeholder="Enter artist name">
            `;
    } else if (dropdown.value === 'artistSentiment') {
        inputFields.innerHTML = `
                <label for="artist">Artist:</label>
                <input type="text" id="artist" name="artist" placeholder="Enter artist name">
            `;
    }
}
