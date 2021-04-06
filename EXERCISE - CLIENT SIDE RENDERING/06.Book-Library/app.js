import { render, html } from "./node_modules/lit-html/lit-html.js";
import { t } from "./template.js";
import { dom, fetchData, genFormListener, validateData } from "./helpers.js";

const url = 'http://localhost:3030/jsonstore/collections/books'

window.addEventListener('load', e => {
    dom['addForm'].style.display = 'block'
    dom['editForm'].style.display = 'none'
})

dom['loadBooks'].addEventListener('click', load)

async function load() {
    const res = await fetchData(url, {})

    const r = Object.entries(res).map(x => [x].reduce((a, [k, v]) =>
            Object.assign(a, { _id: k, author: v.author, title: v.title }), {}))
    if(r.length === 0){ alert('There is no data!')}

    render(t(r), dom['tbody'])
}

genFormListener(dom['addForm'], onClickForm)
genFormListener(dom['editForm'], onClickEditForm)

function onClickForm(x, e) {
    validateData(x)
    const data = x.reduce((a, b) => Object.assign(a, { [b[0]]: b[1] }), {})
        fetchData(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(() => [...dom['addForm'].querySelectorAll('input')].map( x => {if(x.type !== 'submit'){x.value = ''}}))
            .then(load)
}

function onClickEditForm(x) {
    validateData(x)
    const data = x.slice(1).reduce((a, b) => Object.assign(a, { [b[0]]: b[1] }), {})
        fetchData(url + `/${x[0][1]}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(() => [...dom['editForm'].querySelectorAll('input')].map( x => {if(x.type !== 'submit'){x.value = ''}}))
            .then(changeFormView)
            .then(load)
}

dom['tbody'].addEventListener('click', async e => {
    if (e.target.className === 'delete') {
        fetchData(url + `/${e.target.parentElement.id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(load)

    } else if (e.target.className === 'edit') {
        dom['addForm'].style.display = 'none'
        dom['editForm'].style.display = 'block'
        const data = await fetchData(url + `/${e.target.parentElement.id}`)
        if(data._id === undefined){ data._id = e.target.parentElement.id}
        dom['editForm'].querySelector('input[type="hidden"]').value = data._id
        dom['editForm'].querySelector('input[name="title"]').value = data.title
        dom['editForm'].querySelector('input[name="author"]').value = data.author
    }
})

function changeFormView(){
    dom['addForm'].style.display = dom['addForm'].style.display === 'block' ? 'none' : 'block'
    dom['editForm'].style.display = dom['editForm'].style.display === 'none' ? 'block' : 'none'
}
