const domEl = {
    tbody: document.getElementById('tbody'),
    submit: document.getElementById('submit'),
    inputs: document.querySelectorAll('#id, #firstName, #lastName, #facultyNumber, #grade'),
}
const main = {
    baseUrl: 'http://localhost:3030/jsonstore/collections',
    path: 'students',
}
loadStudents()

function loadStudents() {
    fetchData(main['baseUrl'], main['path'])
        .then(renderHTML)
        .catch(errorHandler)
}

function renderHTML(data) {
    const html = Object.values(data)
        .sort((a, b) => Number(a.id) - Number(b.id))
        .map(template)
        .join('')
    domEl['tbody'].innerHTML = html
}

domEl['submit'].addEventListener('click', addNewStudent)

function addNewStudent(e) {
    e.preventDefault()
    const inputs = validateDate(domEl['inputs'])
    const data = Array.from(inputs)
        .reduce((a, b) => Object.assign(a, { [b.id]: b.value }), {})

    fetchData(main['baseUrl'], main['path'], { method: 'POST', body: JSON.stringify(data) })
        .then(loadStudents)
        .catch(errorHandler)
}

function validateDate(data) {
    const check = Array.from(data).every(x => x.value !== '')
    if (check) {
        return data
    }
    errorHandler('Wrong input data!')
}

function errorHandler(error) {
    throw new Error(`${error.status}`)
}

function fetchData(baseUrl, uri, headers = {}) {
    const url = `${baseUrl}/${uri}`

    return fetch(url, headers)
        .then(serverResponse)
        .then(res => res.json())
        .catch(errorHandler)
}

function serverResponse(data) {
    if (!data.ok) {
        throw new Error(data.status)
    }
    return data
}

function template(x) {
    return `
    <tr>
        <td>${x.id}</td>
        <td>${x.firstName}</td>
        <td>${x.lastName}</td>
        <td>${x.facultyNumber}</td>
        <td>${x.grade}</td>
    </tr>`
}