const submitBtn = document.getElementById('submit')
const locationInput = document.getElementById('location')
const forecastElement = document.getElementById('forecast')
const baseUrl = 'http://localhost:3030/jsonstore/forecaster'
const current = document.getElementById('current')
const upcomingWether = document.getElementById('upcoming')

const urlRoutes = {
    'today': '/today/',
    'upcoming': '/upcoming/',
    'locations': '/locations'
}
const symbolMap = {
    'Sunny': '&#x2600',
    'Partly sunny': '&#x26C5',
    'Overcast': '&#x2601',
    'Rain': '&#x2614',
    'Degrees': '&#176'
}

async function getData(url, code) {
    return await fetch(url + code)
    .then(res => res.json())
    .catch(handleErrors)
}

submitBtn.addEventListener('click', attachEvents)

async function attachEvents() {
    if (locationInput.value === '') {
        return
    }

    const serverData = await getData(baseUrl, urlRoutes['locations'])

    const foundTown = serverData.find(x => x.name === locationInput.value) || {code: undefined}

    Promise.all([
        await getData(baseUrl, `${urlRoutes['today']}${foundTown.code}`),
        await getData(baseUrl, `${urlRoutes['upcoming']}${foundTown.code}`),
    ])
        .then(renderForecast)
        .then(appendTo)
        .catch(handleErrors)
}

function renderForecast(data) {
    clearData()
    function renderToday(data) {
        return renderDiv('', { class: 'forecasts' },
            renderSpan(symbolMap[data.forecast.condition], { class: 'condition symbol' }),
            renderSpan('', { class: 'condition' },
                renderSpan(data.name, { class: 'forecast-data' }),
                renderSpan(`${data.forecast.low}${symbolMap['Degrees']}/${data.forecast.high}${symbolMap['Degrees']}`, { class: 'forecast-data' }),
                renderSpan(data.forecast.condition, { class: 'forecast-data' }),
            )
        )
    }
    function renderThreeDays(data) {
        return renderDiv('', { class: 'forecast-info' },
        ...data.forecast.map( x => {
            return renderSpan('', { class: 'upcoming' },
                renderSpan(symbolMap[x.condition], { class: 'symbol' }),
                renderSpan(`${x.low}${symbolMap['Degrees']}/${x.high}${symbolMap['Degrees']}`, { class: 'forecast-data' }),
                renderSpan(x.condition, { class: 'forecast-data' })
            )
        })
        )
    }

    return {
        today: renderToday(data[0]),
        forecast: renderThreeDays(data[1])
    }

}

function appendTo(data) {
    forecastElement.style.display = 'block'
    current.appendChild(data.today)
    upcomingWether.appendChild(data.forecast)
}


function handleErrors(error) {
    let errorBlock = document.getElementById('errors')
    clearData()
    forecastElement.style.display = 'block'
    errorBlock.style.display = 'block'
    errorBlock.innerHTML = 'Wrong city Name! Please try again!'
    locationInput.value = ''
    throw new Error(`The data input is wrong! , ${error}`)
}

const renderDiv = renderHtml.bind(undefined, 'div')
const renderSpan = renderHtml.bind(undefined, 'span')

function renderHtml(type, content, attributes, ...children) {
    const element = document.createElement(type)

    if (content !== '') {
        element.innerHTML = content
    }
    Object.entries(attributes).forEach(([k, v]) => element.setAttribute(k, v))
    Array.from(children).map(x => element.appendChild(x))
    return element
}


function clearData() {
    let errorBlock = document.getElementById('errors')
    Array.from(current.children).slice(1).map( x => x.remove())
    Array.from(upcomingWether.children).slice(1).map( x => x.remove())
    forecastElement.style.display = 'none'
    errorBlock.style.display = 'none'
    errorBlock.innerHTML = ''
}
