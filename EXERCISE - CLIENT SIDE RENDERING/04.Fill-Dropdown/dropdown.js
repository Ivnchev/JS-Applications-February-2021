import { render, html } from "./node_modules/lit-html/lit-html.js";

const url = 'http://localhost:3030/jsonstore/advanced/dropdown'

const dom = {
    menu: document.getElementById('menu'),
    submit: document.getElementById('submit'),
    input: document.getElementById('itemText')
}
const t = t => t.map(x => html`<option value="${x._id}">${x.text}</option>`)

window.addEventListener('load', load)

async function load() {
    await fetchData(url, {})
        .then(x => render(t(Object.values(x)), dom['menu']))
        .catch(() => {
            alert('There is no data on server. You have to made your first post !')
            console.warn('No data on server.\nYou have to made your first post !')
        })
}

dom['submit'].addEventListener('click', async e => {
    e.preventDefault()
    if (dom['input'].value === '') {
        alert('You must fill the reqired field')
        return
    }
    const data = {
        method: 'post',
        'Content-Type': 'application/json',
        body: JSON.stringify({
            text: dom['input'].value
        })
    }
    await fetchData(url, data)
        .then(load)
    dom['input'].value = ''
})

async function fetchData(url, headers) {
    return await fetch(url, headers)
        .then(serverResponse)
        .then(r => r.json())
        .catch(errorHandler)
}

function serverResponse(x) {
    if (!x.ok) {
        throw new Error(x.message)
    }
    return x
}
function errorHandler(e) {
    throw new Error(`${e.message}`)
}