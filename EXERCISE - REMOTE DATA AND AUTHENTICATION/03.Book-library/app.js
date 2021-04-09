const domEl = {
    createForm: document.getElementById('createForm'),
    loadBtn: document.getElementById('loadBooks'),
    editForm: document.getElementById('editForm'),
    table: document.getElementById('booksTable'),
}
const errorhandler = (error) => { throw new Error(error) }
const serverResponse = (res) => {
    if (res === null) { throw new Error('Server data missing!') }
    return res
}
const main = {
    domEl,
    baseUrl: 'http://localhost:3030/jsonstore/collections/books',
    changeBookStatus,
    modifyBook,
    loadBooks
}

domEl['createForm'].querySelector('button')
    .addEventListener('click', (e) => main['modifyBook'](e, 'POST', '', 'createForm'))
domEl['editForm'].querySelector('button')
    .addEventListener('click', (e) => main['modifyBook'](e, 'PUT', main.currentId, 'editForm'))
domEl['loadBtn'].addEventListener('click', () => main['loadBooks']())
domEl['table'].addEventListener('click', (e) => main['changeBookStatus'](e))

async function loadBooks() {
    const data = await getData(this.baseUrl, { method: 'GET' })
    domEl['table'].innerHTML = Object.entries(data).map(template).join('')
    domEl['editForm'].style.display = 'none'
    domEl['createForm'].style.display = 'block'
}

async function modifyBook(e, method, path, form) {
    e.preventDefault()
    const inputs = domEl[form].querySelectorAll('input')
    const [title, author] = validateData(inputs)
    const data = {
        method: method,
        body: JSON.stringify({ author, title })
    }
    await getData(this.baseUrl + `/${path}`, data)
        .then(() => this.loadBooks())
    Array.from(inputs).map(x => x.value = '')
}

async function changeBookStatus(e) {
    if (e.target.textContent === 'Delete') { deleteBook(e) }
    if (e.target.textContent === 'Edit') {
        main.currentId = e.target.parentElement.id
        const data = await getData(main['baseUrl'] + `/${main.currentId}`, {})
        
        domEl['editForm'].style.display = 'block'
        domEl['createForm'].style.display = 'none'
        domEl['editForm'].querySelector('#title').value = data.title
        domEl['editForm'].querySelector('#author').value = data.author
    }
}

async function deleteBook(e) {
    await getData(main['baseUrl'] + `/${e.target.parentElement.id}`, { method: 'DELETE' })
    const crntBook = e.target.parentElement.parentElement
    crntBook.remove()
}

async function getData(url, body) {
    const data = await fetch(url, body)
        .then(res => res.json())
        .then(serverResponse)
        .catch(errorhandler)
    return data
}

function validateData(data) {
    if (data[0].value === '' || data[1].value === '') {
        alert('You must put valid book data')
        errorhandler('You must put valid book data')
    }
    return [data[0].value, data[1].value]
}

function template(data) {
    return `<tr>
                <td>${data[1].author}</td>
                <td>${data[1].title}</td>
                <td id="${data[0]}">
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
            </tr>
    `
}