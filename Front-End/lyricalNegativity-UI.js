class LyricalNegativityUI {
    constructor() {
        this.setupUI();
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
        this.loadingCircle()
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
            <label for="${field}">${this.capitalizeFirstLetter(field)}:</label>
            <input type="text" id="${field}" name="${field}" placeholder="Enter ${field} name">
            <br>
        `).join('');
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    fetchSentimentData() {
        const func = document.getElementById('dropdown').value;
        const apiUrlBase = 'https://yajjcjryrg7vfihndc4vxv5hve0pljlx.lambda-url.us-east-1.on.aws/songWokeApi';
        let apiUrl = `${apiUrlBase}?func=${func}`;

        const artist = document.getElementById('artist').value;
        if (func !== 'artistSentiment') {
            const item = document.getElementById(func.slice(0, -9)).value; // 'song' or 'album'
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

    getValidSongSentiment(data) {
        console.log(data);
        const threshold = 0.7;

        toxicity.load(threshold).then(model => {
            let sentences = data;

            model.classify(sentences).then(predictions => {
                console.log(predictions);
                lyricalNegativityUI.createVisualization(predictions);
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
                lyricalNegativityUI.createVisualization(predictions);
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
                lyricalNegativityUI.createVisualization(predictions);
            });
        });
    }
    refreshPage() {
        location.reload();
    }

    createVisualization(predictions) {
        // Clear previous visualization if any
        const visContainer = document.getElementById('visualizationContainer');
        visContainer.innerHTML = '';

        // Set the dimensions and margins of the graph
        const margin = {top: 30, right: 30, bottom: 70, left: 60},
            width = 300 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;

        // Append the svg object to the div called 'visualizationContainer'
        const svg = d3.select(visContainer).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X axis
        const x = d3.scaleBand()
            .range([0, width])
            .domain(predictions.map(d => d.label))
            .padding(0.2);
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, 1])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Bars
        svg.selectAll("mybar")
            .data(predictions)
            .enter()
            .append("rect")
            .attr("x", d => x(d.label))
            .attr("y", d => y(d.results[0].probabilities["1"]))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.results[0].probabilities["1"]))
            .attr("fill", "#E71D36");
    }

    loadingCircle() {
        this.loadingElements = ['load-cir1', 'load-cir2','load-cir3','load-cir4', 'load-cir5', 'load-cir6'].map(id => document.getElementById(id))
        for (let i = 0; i < this.loadingElements.length; i++) {
            this.loadingElements[i].style.width += '20px'
            this.loadingElements[i].style.height += '20px'
            this.loadingElements[i].style.backgroundColor = 'grey'
            this.loadingElements[i].style.position = 'absolute'




            console.log(this.loadingElements[i])
        }
    }
}

const lyricalNegativityUI = new LyricalNegativityUI();




