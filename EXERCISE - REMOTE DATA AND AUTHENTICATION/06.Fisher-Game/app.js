import {
    validateDate,
    fetchData,
    urls,
    removeUserToken,
    catchTemplate,
    errorHandler,
    clearData
} from './src/helpers.js'

const domEl = {
    main: document.getElementById('main'),
    newCatch: document.getElementById('addForm'),
    guest: document.getElementById('guest'),
    userLogOut: document.getElementById('user'),
    load: document.getElementById('load'),
    main: document.getElementById('catches')
}
async function getCatches(user) {
    let url
    if (user) {
        url = urls['catch'] + `?where=_ownerId%3D"${user}"`
    } else {
        url = urls['catch']
    }
    const data = {
        method: 'get',
    }
    return await fetchData(url, '', data)
}



window.addEventListener('load', async () => {

    if (sessionStorage.getItem('token') !== null) {
        domEl['userLogOut'].addEventListener('click', logOut)
        domEl['newCatch'].querySelector('button').addEventListener('click', postCatch)

        domEl['guest'].style.display = 'none'
        domEl['userLogOut'].style.display = 'inline-block'
        domEl['newCatch'].querySelector('button').disabled = false
    }
    domEl['load'].addEventListener('click', loadCatches)
})

async function logOut() {
    const data = {
        method: 'post',
        headers: {
            'X-Authorization': sessionStorage.getItem('token')
        },
    }
    fetch(urls['logout'], data)
        .then(removeUserToken)
        .then(() => {
            domEl['guest'].style.display = 'inline-block'
            domEl['userLogOut'].style.display = 'none'
        })
}


async function postCatch(e) {
    e.preventDefault()

    const rowData = [...domEl['newCatch'].querySelectorAll('input')]

    const body = JSON.stringify(validateDate(rowData)
        .reduce((a, b) => Object.assign(a, { [b.className]: b.value }), {}))

    const data = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('token'),
        },
        body
    }

    fetchData(urls['catch'], '', data)
        .then(() => clearData(rowData))
        .then(() => loadCatches())

}

async function loadCatches(e) {
    const token = sessionStorage.getItem('user')
    let data
    try{
        data = await getCatches(token)
        if(data.length === 0){ throw new Error}
    } catch(e){
        alert('No records!')
        errorHandler({message: 'No records!'})
    }
    const html = data.map(catchTemplate).join('')
    domEl['main'].innerHTML = ''
    domEl['main'].innerHTML = html
    domEl['main'].addEventListener('click', ctaCatchInfo)
}

async function ctaCatchInfo(e) {

    if (e.target.tagName !== 'BUTTON') {
        return
    }

    const element = e.target.parentElement
    if (e.target.name === 'delete') {
        const data = {
            method: 'delete',
            headers: {
                'X-Authorization': sessionStorage.getItem('token')
            }
        }
        return await fetchData(urls['catch'] + `/${element.id}`, '', data)
            .then(() => element.remove())
    }

    const rowData = [...element.querySelectorAll('input')]

    const body = JSON.stringify(validateDate(rowData)
        .reduce((a, b) => Object.assign(a, { [b.className]: b.value }), {}))

    const data = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('token'),
        },
        body
    }

    await fetchData(urls['catch'] + `/${element.id}`, '', data)
        .then(() => {
            alert('Updated')
            location.href = 'index.html'
        })

}
