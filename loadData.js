const countryIDs = ['BE', 'BG', 'CZ', 'DK', 'DE', 'EE', 'IE', 'EL', 'ES', 'FR', 'HR', 'IT', 'CY', 'LV', 'LT', 'LU', 'HU', 'MT', 'NL', 'AT', 'PL', 'PT', 'RO', 'SI', 'SK', 'FI', 'SE']
// const countryIDs = ['BE']
const startYear = 2005 
const intervalDuration = 15 // numarul de ani pentru care luam date
const arrayToSave = [] // va contione setuld de date

//adaugam in arrayToSave pentru o tara si un indicator valorile pentru toti anii
async function addToArray(req, indicator, countryID){
    await fetch(req).then(response => response.json().then(json => {
        array = json.value
        for(let i = 0; i < intervalDuration; i++){
            arrayToSave.push({tara: countryID, an: i, indicator: indicator, valoare: array[i]})
        }
    }))
}

async function getData(){
    const fixedPart = 'http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/'
    req1 = fixedPart + 'demo_mlexpec?precision=1&sex=T&age=Y1'                   // life expectancy
    req2 = fixedPart + 'demo_pjan?precision=1&sex=T&age=TOTAL'                   // population
    req3 = fixedPart + 'sdg_08_10?na_item=B1GQ&precision=1&unit=CLV10_EUR_HAB'   // gdp

    // adaugam anii in request-uri
    for(let i = 0; i < intervalDuration; i++){
        req3 += '&time=' + (startYear + i)
        req2 += '&time=' + (startYear + i)
        req1 += '&time=' + (startYear + i)
    }

    loadAllCountries = async () => {
        for(countryID of countryIDs) {
            let r1 = req1 + '&geo=' + countryID
            let r2 = req2 + '&geo=' + countryID
            let r3 = req3 + '&geo=' + countryID
            
            const fetchData = async() => {
                await addToArray(r1, "SV", countryID)
                await addToArray(r2, "POP", countryID)
                await addToArray(r3, "PIB", countryID)
            }
            await fetchData()
        }
    }
    await loadAllCountries()
}

