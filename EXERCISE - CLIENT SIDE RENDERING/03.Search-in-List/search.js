import { towns } from "./towns.js";
import { render, html } from "./node_modules/lit-html/lit-html.js";

const t = (t) => html`<ul>${t.map(x => html`<li>${x}</li>`)}</ul>`

const dom = {
   towns: document.getElementById('towns'),
   search: document.getElementById('searchText'),
   result: document.getElementById('result'),
   btn: document.getElementById('btn-search')
}

render(t(towns), dom['towns'])

dom['btn'].addEventListener('click', onClick)
document.addEventListener('keydown', onClick)

function onClick(e) {
   clearStyles()
   if(e.target.id !== 'btn-search' && e.key !== 'Enter'){
      return
   }
   let c = 0;
   if (dom['search'].value === '') {
      alert('You should insert town first')
      return
   }
   
   [...dom['towns'].querySelectorAll('li')]
      .map(x => {
         if (new RegExp(dom['search'].value, 'gi').test(x.textContent)) {
            x.className = 'active'
            c++
         }
      })
   dom['result'].textContent = (c ? c : 'No') + ' matches found!'
   
   dom['search'].value = ''
}

function clearStyles() {
   [...dom['towns'].querySelectorAll('li')].map(x => x.className = '')
   dom['result'].textContent = ''
}