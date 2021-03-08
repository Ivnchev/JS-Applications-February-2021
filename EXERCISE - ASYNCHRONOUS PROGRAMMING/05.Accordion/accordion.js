const container = document.getElementById('container')
const baseUrl = 'http://localhost:3030/jsonstore/advanced/articles'

const errorHandler = (e) => { throw new Error(`${e.status} , ${e.statusText}`) }

document.addEventListener('click', getInfo)

const routes = {
    'list': '/list',
    'details': '/details/'
}
async function viewData() {
    await getData(baseUrl + routes['list'])
    .then(renderData)
    .catch(errorHandler)
}

function renderData(data) {
    container.innerHTML = data.map(x => template(x)).join('')
}

async function getData(url) {
    return await fetch(url)
        .then(res => res.json())
        .catch(errorHandler)
}

async function getInfo(e) {
    if (e.target.tagName !== 'SPAN') { return }

    const parent = e.target.parentElement.parentElement
    
    await getData(baseUrl + routes['details'] + e.target.id)
        .then(data => {renderMoreInfo(data, parent)} )
        .catch(errorHandler)
}
function renderMoreInfo(data, e) {
    const moreDetails = e.querySelector('#extra')
    moreDetails.style.display = moreDetails.style.display === 'block' ? 'none' : 'block'
    e.querySelector('p').innerHTML = data.content
}
function template(data) {
    return `
    <div id="accordion">
            <div class="head">
            <span>${data.title}</span>
            <span class="button"  id=${data._id}>More</span>
            </div>
            <div id="extra">
                <p></p>
            </div>
        </div>
    `
}