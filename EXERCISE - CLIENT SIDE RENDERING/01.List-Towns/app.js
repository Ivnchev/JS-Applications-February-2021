import { obsObj, obs } from "./obs.js"
import { html, render } from "./node_modules/lit-html/lit-html.js";

const x = obsObj({ data: [] })
const form = document.getElementById('townForm')
const root = document.getElementById('root')

obs(x, (p, prev, next) => {
    render(html`<ul>${next.map(x => html`<li>${x}</li>`)}</ul>`, root)
})

form.addEventListener('submit', e => {
    e.preventDefault()
    new FormData(e.target)
})
form.addEventListener('formdata', e => {
    x.data = [...e.formData.values()][0].split(', ')
})
