class LyricalNegativityVisualizations {
    constructor() {
    }

    createBarchart(predictions) {
        const visContainer = document.getElementById('viz-1-ctn');
        visContainer.innerHTML = '';

        const containerWidth = visContainer.clientWidth;
        const containerHeight = visContainer.clientHeight;

        const margin = {top: 30, right: 30, bottom: 70, left: 60},
            width = containerWidth - margin.left - margin.right,
            height = containerHeight - margin.top - margin.bottom;

        const svg = d3.select(visContainer).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

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

        const y = d3.scaleLinear()
            .domain([0, 1])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

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

    createPieChart(data) {
        const visContainer = document.getElementById('viz-2-ctn');
        visContainer.innerHTML = '';

        const containerWidth = visContainer.clientWidth;
        const containerHeight = visContainer.clientHeight;

        const margin = { top: 40, right: 40, bottom: 40, left: 40 },
            width = containerWidth - margin.left - margin.right,
            height = containerHeight - margin.top - margin.bottom,
            radius = Math.min(width, height) / 2;

        const svg = d3.select(visContainer).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${width / 2 + margin.left},${height / 2 + margin.top})`);

        const customColors = ['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c', '#ffff33'];

        const color = d3.scaleOrdinal(customColors);

        const pie = d3.pie()
            .value(d => d.value);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        const arcs = svg.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc");

        arcs.append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => color(i));

        arcs.append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .text(d => d.data.label)
            .style("font-size", "12px")
            .style("fill", "black");
    }

    createMostCommonWord(str) {
        const wordFrequency = {};
        const words = str.toLowerCase().split(/\W+/);
        const personalPronouns = new Set(["i", "me", "you", "he", "she", "it", "we", "they", "us", "him", "her", "them", "the", "a", "don't", "your", "my"]);

        // Count the frequency of each word, excluding personal pronouns
        words.forEach(word => {
            if (word && !personalPronouns.has(word)) { // Exclude empty strings and personal pronouns
                wordFrequency[word] = (wordFrequency[word] || 0) + 1;
            }
        });

        let maxCount = 0;
        let mostCommonWord = '';

        for (const word in wordFrequency) {
            if (wordFrequency[word] > maxCount) {
                maxCount = wordFrequency[word];
                mostCommonWord = word;
            }
        }

        const visContainer = document.getElementById('viz-3-ctn');
        if (visContainer) {
            visContainer.textContent = `Most Common Word is: ${mostCommonWord}`;
        } else {
            console.error('Element with id "viz-1-ctn" not found.');
        }

        return mostCommonWord;
    }


}


