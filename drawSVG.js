const barChart = new BarChart(document.getElementById("barChart"));
const bubbleChart = new BubbleChart(document.getElementById("bubbleChart"));
const bubbleChartAnimation = new BubbleChart(
  document.getElementById("bubbleChartAnimation")
);

function drawSVG(country, indicator) {
  data = []; // va contine datele pentru grafic

  data = arrayToSave
    .filter(
      (element) => element.tara === country && element.indicator === indicator
    )
    .map((element) =>
      element.valoare !== undefined
        ? [element.an + startYear, element.valoare]
        : [element.an + startYear, -1]
    )
    .filter((element) => element[1] !== -1);

  barChart.draw(data);
}

function drawBubbleChart(year) {
  data = [];
  year = year - startYear;

  // dataYears = []
  // for (let i = 0; i < intervalDuration; i++){
  //     dataYears.push(startYear + i)
  // }

  dataPop = arrayToSave.filter(
    (element) => element.indicator === "POP" && element.an == year
  ); // contine valorile pentru populatie intr-un an din toate tarile
  dataPib = arrayToSave.filter(
    (element) => element.indicator === "PIB" && element.an == year
  ); // contine valorile pentru PIB intr-un an din toate tarile
  dataSv = arrayToSave.filter(
    (element) => element.indicator === "SV" && element.an == year
  ); // contine valorile pentru speranta de viata intr-un an din toate tarile

  for (let i = 0; i < dataPop.length; i++) {
    data.push([
      dataPop[i].valoare,
      dataPib[i].valoare,
      dataSv[i].valoare,
      dataPop[i].tara,
    ]); //combinam cele 3 matrice de mai sus si le organizam dupa tara
  }
  data = data.filter(
    (element) =>
      element[0] !== undefined &&
      element[1] !== undefined &&
      element[2] !== undefined &&
      element[3] !== undefined
  ); // eliminam intrarile care au o valoare nedefinita

  bubbleChart.draw(data, year + startYear);
}

function drawBubbleChartAnimation() {
  let years = []; // va contine setul de date pentru fiecare an
  for (let year = 0; year < intervalDuration; year++) {
    let data = []; // va contine setul de date pentru un an

    dataPop = arrayToSave.filter(
      (element) => element.indicator === "POP" && element.an == year
    ); // contine valorile pentru populatie intr-un an din toate tarile
    dataPib = arrayToSave.filter(
      (element) => element.indicator === "PIB" && element.an == year
    ); // contine valorile pentru PIB intr-un an din toate tarile
    dataSv = arrayToSave.filter(
      (element) => element.indicator === "SV" && element.an == year
    ); // contine valorile pentru speranta de viata intr-un an din toate tarile

    for (let i = 0; i < dataPop.length; i++) {
      data.push([
        dataPop[i].valoare,
        dataPib[i].valoare,
        dataSv[i].valoare,
        dataPop[i].tara,
      ]); //combinam cele 3 matrice de mai sus si le organizam dupa tara
    }
    data = data.filter(
      (element) =>
        element[0] !== undefined &&
        element[1] !== undefined &&
        element[2] !== undefined &&
        element[3] !== undefined
    ); // eliminam intrarile care au o valoare nedefinita

    years.push(data); // adaugam datele pentru un an in lista cu datele pentru toti anii
  }

  years = years.filter((year) => year.length > 0); // eliminam setul de date pentru un an daca nu are valori

  function drawAnimation(year) {
    bubbleChartAnimation.draw(years[year], year + startYear);
    setTimeout(() => {
      if (year == years.length - 1) {
        year = -1;
      }
      handler = requestAnimationFrame(() => drawAnimation(year + 1));
    }, 1000);
  }

  drawAnimation(0);
}
