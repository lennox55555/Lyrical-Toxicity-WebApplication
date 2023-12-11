
class LyricalNegativityUI {
    constructor() {
        this.setupUI();
        this.lyricalNegativityVisualizations = new LyricalNegativityVisualizations()
    }

    setupUI() {
        this.panelElements = ['panel1', 'panel2', 'panel3'].map(id => document.getElementById(id));
        this.ctnElements = ['ctn1', 'ctn2', 'ctn3'].map(id => document.getElementById(id));
        document.getElementById('nextButton').addEventListener('click', this.advanceToPanel2);
    }

    advanceToPanel2 = () => {
        this.updatePanelFlex([1, 20, 1]);
        this.toggleDisplay(['none', 'flex', 'none']);
        this.updateBackgroundColor(['#cbcbcb','#ffffff','#cbcbcb'])
        this.updateInputFields();
    }

    advanceToPanel3 = () => {
        this.updatePanelFlex([1, 1, 20]);
        this.toggleDisplay(['none', 'none', 'block']);
        this.updateBackgroundColor(['#f2f2f2','#f2f2f2','#ffffff'])
        this.fetchSentimentData();

    }

    updateBackgroundColor(backgroundColors) {
        this.panelElements.forEach((panel, index) => {
            if (panel) panel.style.backgroundColor = backgroundColors[index];
        });
    }

    updatePanelFlex(flexValues) {
        this.panelElements.forEach((panel, index) => {
            if (panel) panel.style.flex = flexValues[index];
        });
    }

    toggleDisplay(displayValues) {
        this.ctnElements.forEach((ctn, index) => {
            if (ctn) ctn.style.display = displayValues[index];
        });
    }

    updateInputFields() {
        const selectedOption = document.getElementById('dropdown').value;
        let inputFieldsHTML = '';

        switch (selectedOption) {
            case 'songSentiment':
                inputFieldsHTML = this.getInputFieldsHTML('song', 'artist');
                break;
            case 'albumSentiment':
                inputFieldsHTML = this.getInputFieldsHTML('album', 'artist');
                break;
            case 'artistSentiment':
                inputFieldsHTML = this.getInputFieldsHTML('artist');
                break;
        }

        document.getElementById('inputFields').innerHTML = inputFieldsHTML;
    }

    getInputFieldsHTML(...fields) {
        return fields.map(field => `
        <input type="text" id="${field}-input" name="${field}" placeholder="Enter ${field} name" class="${field}-input">
        <br>
    `).join('');
    }

    fetchSentimentData() {
        const func = document.getElementById('dropdown').value;
        const apiUrlBase = 'https://yajjcjryrg7vfihndc4vxv5hve0pljlx.lambda-url.us-east-1.on.aws/songWokeApi';
        let apiUrl = `${apiUrlBase}?func=${func}`;

        const artistElement = document.getElementById('artist-input');
        const artist = artistElement ? artistElement.value : '';

        if (func !== 'artistSentiment') {
            const itemElement = document.getElementById(`${func.slice(0, -9)}-input`); // 'song' or 'album'
            const item = itemElement ? itemElement.value : '';
            apiUrl += `&${func.slice(0, -9)}=${item}`;
        }
        apiUrl += `&artist=${artist}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                this.handleSentimentResponse(data.ans, func);
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleSentimentResponse(data, func) {
        const handlerMap = {
            songSentiment: () => this.getValidSongSentiment(data),
            albumSentiment: () => this.getValidAlbumSentiment(data),
            artistSentiment: () => this.getValidArtistSentiment(data),

        };

        if (handlerMap[func]) {
            handlerMap[func]();
        }
    }

    countWords(str) {
        const words = str.split(" ");
        const totalWords = words.length;

        const normalizedWords = words.map(word => word.toLowerCase());
        const uniqueWords = new Set(normalizedWords);
        const uniqueWordCount = uniqueWords.size;

        return [
            { label: "Unique Words", value: uniqueWordCount },
            { label: "Total Words", value: totalWords }
        ];
    }


    getValidSongSentiment(data) {
        const threshold = 0.7;

        toxicity.load(threshold).then(model => {
            let sentences = data;

            model.classify(sentences).then(predictions => {
                this.lyricalNegativityVisualizations.createBarchart(predictions)
                this.lyricalNegativityVisualizations.createPieChart(this.countWords(data))
                this.lyricalNegativityVisualizations.createMostCommonWord(data)
            });
        });
    }
    getValidAlbumSentiment(data) {
        console.log(data);

        const threshold = 0.7;

        toxicity.load(threshold).then(model => {
            let sentences = data;

            model.classify(sentences).then(predictions => {
                console.log(predictions);
                this.lyricalNegativityVisualizations.createBarchart(predictions)
                this.lyricalNegativityVisualizations.createPieChart(this.countWords(data))
                this.lyricalNegativityVisualizations.createMostCommonWord(data)
            });
        });
    }
    getValidArtistSentiment(data) {
        console.log(data);

        const threshold = 0.7;

        toxicity.load(threshold).then(model => {
            let sentences = data;

            model.classify(sentences).then(predictions => {
                console.log(predictions);
                this.lyricalNegativityVisualizations.createBarchart(predictions)
                tthis.lyricalNegativityVisualizations.createPieChart(this.countWords(data))
                this.lyricalNegativityVisualizations.createMostCommonWord(data)
            });
        });
    }
    refreshPage() {
        location.reload();
    }

}
