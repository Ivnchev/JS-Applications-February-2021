const dom = {
    tbody: document.querySelector('tbody'),
    loadBooks: document.getElementById('loadBooks'),
    addForm: document.getElementById('add-form'),
    editForm: document.getElementById('edit-form')
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

function validateData(z) {
    const data = z.every(x => x[1] !== '')
    if (data) {
        return z
    }
    alert('Wrong input data!')
    throw new Error('Wrong input data!')
}

function genFormListener(element, cb) {
    element.addEventListener('submit', e => {
        e.preventDefault()
        new FormData(e.target)
    })
    
    element.addEventListener('formdata', e => {
        cb([...e.formData.entries()], e)
    })
}

export {
    fetchData,
    serverResponse,
    errorHandler,
    validateData,
    genFormListener,
    dom
}