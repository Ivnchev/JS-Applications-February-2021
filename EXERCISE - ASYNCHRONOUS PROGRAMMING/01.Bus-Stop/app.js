const submit = document.getElementById('submit')
const buses = document.getElementById('buses')
const stopName = document.getElementById('stopName')
const stopId = document.getElementById('stopId')

const renderLi = renderElement.bind(undefined, 'li')

submit.addEventListener('click', () => busInfo())

async function busInfo() {

    buses.innerHTML = ''
    if(stopId.value === ''){ return }

    const rowData = await getData(stopId.value)
    const data = convertData(rowData)

    Array.from(data.buses.map(renderLi)).map( x => buses.appendChild( x ) )
    stopName.innerHTML = data.name

    stopId.value = ''
}

async function getData(busId) {
    return await fetch(`http://localhost:3030/jsonstore/bus/businfo/${busId}`)
        .then( res => res.json())
        .catch(errorHandler)
}

function convertData(data) {
    return {
        buses : Object.entries(data.buses).map( ([b,m]) => `Bus ${b} arrives in ${m} minutes.`),
        name : data.name
    }
}

function errorHandler() {
    stopName.innerHTML = 'Error'
    buses.innerHTML = ''
    throw new Error(`Wrong Input Data !`)
}

function renderElement(type, content) {
    const element = document.createElement(type)
    if( content !== ''){
        element.innerHTML = content
    }
    return element
}