async function init(){
    await getData()
    drawSVG(selectCountry.value, selectValue.value)
    drawBubbleChart(selectBubbleChartYear.value)
    drawBubbleChartAnimation()
}

init()

selectValue = document.getElementById('selectValue')
selectCountry = document.getElementById('selectCountry')
selectBubbleChartIndicator = document.getElementById('selectBubbleChartIndicator')
selectBubbleChartYear = document.getElementById('selectBubbleChartYear')

// schimbam primul grafic atunci cand se schimba indicatorul
selectValue.addEventListener('change', () => {
    console.log('changed indicator')
    console.log('value: ' + selectValue.value)
    drawSVG(selectCountry.value, selectValue.value)
})

// adaugam fiecare tara in selectul pentru tari
countryIDs.forEach(countryID => {
    option = document.createElement('option')
    option.setAttribute('value', countryID)
    option.innerHTML = countryID
    selectCountry.appendChild(option)
})

// adaugam fiecare an in selectul pentru ani
for (let i = 0; i < intervalDuration; i++) {
    option = document.createElement('option')
    option.setAttribute('value', startYear + i)
    option.innerHTML = startYear + i
    selectBubbleChartYear.appendChild(option)
}

// schimbam primul grafic atunci cand se schimba tara
selectCountry.addEventListener('change', () => {
    console.log('changed country')
    drawSVG(selectCountry.value, selectValue.value)
})

//desenam un nou bubble chart cand se schimba anul
selectBubbleChartYear.addEventListener('change', () => {
    console.log('changed bubble chart year')
    drawBubbleChart(selectBubbleChartYear.value)
})
