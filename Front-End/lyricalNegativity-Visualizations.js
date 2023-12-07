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
}
