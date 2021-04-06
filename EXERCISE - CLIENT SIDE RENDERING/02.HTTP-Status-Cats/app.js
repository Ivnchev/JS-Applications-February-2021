import { cats } from "./catSeeder.js";
import { render } from "./node_modules/lit-html/lit-html.js";
import { t } from "./template.js";
const container = document.getElementById('allCats')
container.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        const b = e.target.parentElement.querySelector('.showBtn')
        const s = e.target.parentElement.querySelector('.status')
        s.style.display  = s.style.display === 'none' ? 'block' : 'none'
        b.textContent  = b.textContent === 'Show status code' ? 'Hide status code' : 'Show status code'
    }
})

render(t(cats), container)

