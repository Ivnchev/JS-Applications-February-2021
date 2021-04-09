import { validateDate, 
    fetchData, 
    urls, 
    setUserToken, 
    clearData, 
    errorHandler } from './helpers.js'


const domEl = {
    'registerForm': document.getElementById('registerForm'),
    'loginForm': document.getElementById('loginForm')
}

domEl['loginForm'].addEventListener('submit', loginRowData)
domEl['registerForm'].addEventListener('submit', loginRowData)

function loginRowData(e) {
    e.preventDefault()
    const form = e.target.id === 'registerForm'
        ? domEl['registerForm']
        : domEl['loginForm']

    const rowData = [...form.querySelectorAll('label>input')]

    const body = JSON.stringify(validateDate(rowData)
        .reduce( (a,b) => Object.assign(a, {[b.name]: b.value}), {}))

    const data = {
        method: 'post',
        'Content-Type': 'application/json',
        body
    }
    e.target.id === 'registerForm'
        ? onClickRegister(data, rowData)
        : onClickLogin(data, rowData)
}


async function onClickRegister(data, rowData) {
    await fetchData(urls['register'], '', data)
    .then(setUserToken)
    .then(() => clearData(rowData))
    .then(() => window.location.href = 'index.html')
    .catch(errorHandler)
}

async function onClickLogin(data, rowData) {

    await fetchData(urls['login'], '', data)
    .then(setUserToken)
    .then(() => clearData(rowData))
    .then(() => window.location.href = 'index.html')
    .catch(errorHandler)
}
