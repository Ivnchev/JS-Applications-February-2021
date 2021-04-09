const domEl = {
    phonebook: () => document.getElementById('phonebook'),
    btnLoad: () => document.getElementById('btnLoad'),
    person: () => document.getElementById('person'),
    phone: () => document.getElementById('phone'),
    btnCreate: () => document.getElementById('btnCreate')
}

const errorhandler = (error) => { throw new Error(error) }
const serverResponse = (res) => {
    if(res === null){ throw new Error('Server data missing!') }
    return res
}
const clearInputs = () => { [domEl['person'](), domEl['phone']()].map(x => x.value = '') }

const main = {
    domEl,
    baseUrl: 'http://localhost:3030/jsonstore/phonebook',
    loadContacts,
    createContact,
    deleteContact,
}

domEl['btnLoad']().addEventListener('click', () => main['loadContacts']())
domEl['btnCreate']().addEventListener('click', () => main['createContact']())
domEl['phonebook']().addEventListener('click', e => main['deleteContact'](e))

async function loadContacts() {
    try{
        const data = await getData(this.baseUrl, { method: 'GET' })
        this.domEl.phonebook().innerHTML = Object.entries(data)
            .map(([id, c]) => `<li id =${id}>${c.person}: ${c.phone}<button>Delete</button></li>`)
            .join('')
    } catch(error){
        errorhandler(error)
    }
}

async function createContact() {
    const data = {
        person: this.domEl.person().value,
        phone: this.domEl.phone().value,
    }
    try {
        await getData(this.baseUrl, { method: 'POST', body: JSON.stringify(data) })
        .then(this.loadContacts())
        .then(clearInputs)
    } catch(error){
        errorhandler(error)
    }
}
async function deleteContact(e) {
    if (e.target.tagName !== 'BUTTON') {
        return
    }
    const personId = e.target.parentElement.id

    try{
        await getData(this.baseUrl + `/${personId}`, { method: 'DELETE' })
        e.target.parentElement.remove()
    } catch(error){
        errorhandler(error)
    }
}
async function getData(url, body) {
    const data = await fetch(url, body)
        .then(res => res.json())
        .then(serverResponse)
        .catch(errorhandler)
    return data
}