class BubbleChart {
  constructor(domElement) {
    this.domElement = domElement;
    this.svgns = "http://www.w3.org/2000/svg";
    this.width = this.domElement.clientWidth;
    this.height = this.domElement.clientHeight;
    this.offset = 70;
    this.chartHeight = this.height - this.offset * 2;
    this.chartWidth = this.width - this.offset * 2;
    this.createSVG();

    this.location = domElement.getBoundingClientRect();
    console.log(
      this.location.top,
      this.location.left,
      this.location.bottom,
      this.location.right
    );
  }
  draw(data, year) {
    this.data = data;
    this.year = year;

    this.drawBackground();
    this.drawBubbles();
    this.drawValuesOnTheEdge();

    this.domElement.appendChild(this.svg);
  }
  createSVG() {
    this.svg = document.createElementNS(this.svgns, "svg");
    this.svg.setAttribute("style", "border: 1px solid black");
    this.svg.setAttribute("width", this.width); //note: this.svg.width is readonly
    this.svg.setAttribute("height", this.height);
  }
  drawBackground() {
    const rect = document.createElementNS(this.svgns, "rect");
    rect.setAttribute("x", 0);
    rect.setAttribute("y", 0);
    rect.setAttribute("height", this.height);
    rect.setAttribute("width", this.width);
    rect.style.fill = "WhiteSmoke";
    this.svg.appendChild(rect);

    const chartRect = document.createElementNS(this.svgns, "rect");
    chartRect.setAttribute("x", this.offset);
    chartRect.setAttribute("y", this.offset);
    chartRect.setAttribute("height", this.chartHeight);
    chartRect.setAttribute("width", this.chartWidth);
    chartRect.style.fill = "WhiteSmoke";
    chartRect.setAttribute("stroke", "grey");
    chartRect.setAttribute("stroke-width", "1");
    this.svg.appendChild(chartRect);
  }
  drawBubbles() {
    const pop = this.data.map((x) => x[0]);
    const pib = this.data.map((x) => x[1]);
    const sv = this.data.map((x) => x[2]);

    const minRadius = 10;
    const maxRadius = 30;

    const maxPop = Math.max(...pop);
    const maxPib = Math.max(...pib);
    const maxSv = Math.max(...sv);
    const minSv = Math.min(...sv);

    this.maxPib = maxPib;
    this.maxPop = maxPop;

    for (let i = 0; i < this.data.length; i++) {
      const bubble = document.createElementNS(this.svgns, "circle");

      let x = (this.chartWidth * this.data[i][0]) / maxPop + this.offset;
      let y = (this.chartHeight * this.data[i][1]) / maxPib + this.offset;
      let r =
        minRadius +
        (maxRadius - minRadius) * ((this.data[i][2] - minSv) / (maxSv - minSv));

      bubble.setAttribute("cx", x);
      bubble.setAttribute("cy", y);
      bubble.setAttribute("r", r);
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);
      bubble.setAttribute("fill", "#" + randomColor);
      this.svg.appendChild(bubble);

      bubble.addEventListener("click", (e) => {
        console.log(
          "this.data: ",
          this.data[i][0],
          this.data[i][1],
          this.data[i][2]
        );
        console.log("x:" + x + ",y:" + y + ",r:" + r);
      });

      // afisam tooltipul cand mouseul este peste o bula
      bubble.addEventListener("mouseover", (e) => {
        console.log("mouse over bubble");
        console.log("y: " + e.clientY);

        // document.getElementById('tara').innerHTML = "Tara: " + data[i][3];
        document.getElementById("tara").innerHTML = "Country: " + data[i][3];
        // document.getElementById('populatie').innerHTML = "Populatie: " + this.data[i][0];
        document.getElementById("populatie").innerHTML =
          "Population: " + this.data[i][0];
        // document.getElementById('pib').innerHTML = "PIB: " + this.data[i][1];
        document.getElementById("pib").innerHTML = "GDP: " + this.data[i][1];
        document.getElementById("sperantaDeViata").innerHTML =
          "Speranta de Viata: " + this.data[i][2];
        document.getElementById("sperantaDeViata").innerHTML =
          "Life Expectancy: " + this.data[i][2];
        bubbleToolTip.style.visibility = "visible";

        const left = bubble.getBoundingClientRect().left;
        const right = bubble.getBoundingClientRect().right;
        bubbleToolTip.style.left = `${
          left + (right - left) / 2 - bubbleToolTip.offsetWidth / 2
        }px`;
        bubbleToolTip.style.top = `${e.pageY - bubbleToolTip.offsetHeight}px`;
      });

      // ascundem tooltipul cand mouseul paraseste bula
      bubble.addEventListener("mouseleave", (e) => {
        bubbleToolTip.style.visibility = "hidden";
      });
    }

    //draw bounds

    const verticalRectLeft = document.createElementNS(this.svgns, "rect");
    verticalRectLeft.setAttribute("x", 0);
    verticalRectLeft.setAttribute("y", 0);
    verticalRectLeft.setAttribute("height", this.height);
    verticalRectLeft.setAttribute("width", this.offset - 1);
    verticalRectLeft.style.fill = "WhiteSmoke";
    this.svg.appendChild(verticalRectLeft);

    const verticalRectRight = document.createElementNS(this.svgns, "rect");
    verticalRectRight.setAttribute("x", this.width - this.offset + 1);
    verticalRectRight.setAttribute("y", 0);
    verticalRectRight.setAttribute("height", this.height);
    verticalRectRight.setAttribute("width", this.offset - 1);
    verticalRectRight.style.fill = "WhiteSmoke";
    this.svg.appendChild(verticalRectRight);

    const horizontalRectDown = document.createElementNS(this.svgns, "rect");
    horizontalRectDown.setAttribute("x", 0);
    horizontalRectDown.setAttribute("y", this.height - this.offset + 1);
    horizontalRectDown.setAttribute("height", this.offset - 1);
    horizontalRectDown.setAttribute("width", this.width);
    horizontalRectDown.style.fill = "WhiteSmoke";
    this.svg.appendChild(horizontalRectDown);

    const horizontalRectUp = document.createElementNS(this.svgns, "rect");
    horizontalRectUp.setAttribute("x", 0);
    horizontalRectUp.setAttribute("y", 0);
    horizontalRectUp.setAttribute("height", this.offset - 1);
    horizontalRectUp.setAttribute("width", this.width);
    horizontalRectUp.style.fill = "WhiteSmoke";
    this.svg.appendChild(horizontalRectUp);

    const text = document.createElementNS(this.svgns, "text");
    text.setAttribute("x", this.width / 2);
    text.setAttribute("y", this.offset / 2);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("alignment-baseline", "central");
    text.setAttribute("font-size", "40");
    text.setAttribute("font-family", "Helvetica");
    text.innerHTML = this.year;
    this.svg.appendChild(text);
  }

  drawValuesOnTheEdge() {
    const distanceFromChart = this.offset / 2;

    const text0Y = document.createElementNS(this.svgns, "text");
    text0Y.setAttribute("x", this.offset - distanceFromChart);
    text0Y.setAttribute("y", this.height - this.offset);
    text0Y.setAttribute("text-anchor", "middle");
    text0Y.setAttribute("alignment-baseline", "central");
    text0Y.setAttribute("font-size", "20");
    // text0Y.setAttribute('font-family', 'Helvetica')
    text0Y.innerHTML = "0";
    this.svg.appendChild(text0Y);

    const text0X = document.createElementNS(this.svgns, "text");
    text0X.setAttribute("x", this.offset);
    text0X.setAttribute("y", this.height - this.offset + distanceFromChart);
    text0X.setAttribute("text-anchor", "middle");
    text0X.setAttribute("alignment-baseline", "central");
    text0X.setAttribute("font-size", "20");
    // text0X.setAttribute('font-family', 'Helvetica')
    text0X.innerHTML = "0";
    this.svg.appendChild(text0X);

    const maxY = document.createElementNS(this.svgns, "text");
    maxY.setAttribute("x", this.offset - distanceFromChart);
    maxY.setAttribute("y", this.offset);
    maxY.setAttribute("text-anchor", "middle");
    maxY.setAttribute("alignment-baseline", "central");
    maxY.setAttribute("font-size", "20");
    // maxY.setAttribute('font-family', 'Helvetica')
    maxY.innerHTML = this.maxPib;
    this.svg.appendChild(maxY);

    const maxX = document.createElementNS(this.svgns, "text");
    maxX.setAttribute("x", this.width - this.offset);
    maxX.setAttribute("y", this.height - this.offset + distanceFromChart);
    maxX.setAttribute("text-anchor", "middle");
    maxX.setAttribute("alignment-baseline", "central");
    maxX.setAttribute("font-size", "20");
    // maxX.setAttribute('font-family', 'Helvetica')
    maxX.innerHTML = this.maxPop;
    this.svg.appendChild(maxX);

    for (let i = 1; i < 4; i++) {
      const value = document.createElementNS(this.svgns, "text");
      value.setAttribute("x", this.offset - distanceFromChart);
      value.setAttribute("y", this.offset + (this.chartHeight / 4) * i);
      value.setAttribute("text-anchor", "middle");
      value.setAttribute("alignment-baseline", "central");
      value.setAttribute("font-size", "20");
      // value.setAttribute('font-family', 'Helvetica')
      value.innerHTML = Math.round((this.maxPib / 4) * (4 - i));
      this.svg.appendChild(value);
    }

    for (let i = 1; i < 4; i++) {
      const value = document.createElementNS(this.svgns, "text");
      value.setAttribute("x", this.offset + (this.chartWidth / 4) * i);
      value.setAttribute("y", this.height - this.offset + distanceFromChart);
      value.setAttribute("text-anchor", "middle");
      value.setAttribute("alignment-baseline", "central");
      value.setAttribute("font-size", "20");
      // value.setAttribute('font-family', 'Helvetica')
      value.innerHTML = Math.round((this.maxPop / 4) * i);
      this.svg.appendChild(value);
    }
  }
}
