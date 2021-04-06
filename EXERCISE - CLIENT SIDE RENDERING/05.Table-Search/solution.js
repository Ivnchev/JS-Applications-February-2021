
import { render, html } from "./node_modules/lit-html/lit-html.js";


const url = 'http://localhost:3030/jsonstore/advanced/table'

const t = t => t.map(x => html`<tr>${
   Object.values(x)
      .map(z => html`<td>${z}</td>`)
   }</tr>`)

window.addEventListener('load', load)

const dom = {
   tbody: document.querySelector('tbody'),
   data: document.querySelector("tbody").children,
   search: document.querySelector('#searchField')
}

async function load() {
   const data = Object.entries(await fetchData(url, {}))
        .map(x => [x].reduce((a, [k, v]) =>
            Object.assign(a, { name: `${v.firstName} ${v.lastName}` , email: v.email,  course: v.course }), {}))
   render(t(Object.values(data)), dom['tbody'])

}

document.querySelector('#searchBtn').addEventListener('click', onClick);
dom['search'].addEventListener('keydown', onClick);
function onClick(e) {
   if(e.type !== 'click' && e.key !== 'Enter'){
      return
   }
   if(dom['search'].value === ''){
      alert('You must insert name, email or course!')
      console.warn('\nYou must insert name, email or course!')
      return
   }

   [...dom['data']]
      .map(x =>
         new RegExp(dom['search'].value, 'gi').test(x.textContent)
            ? x.setAttribute('class', 'select')
            : x.removeAttribute('class')
      )
      dom['search'].value = ''
}


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
