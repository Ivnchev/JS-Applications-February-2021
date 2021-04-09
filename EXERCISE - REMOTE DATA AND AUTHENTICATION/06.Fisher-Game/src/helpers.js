const urls = {
    register: 'http://localhost:3030/users/register',
    login: 'http://localhost:3030/users/login',
    logout: 'http://localhost:3030/users/logout',
    catch: 'http://localhost:3030/data/catches'
}

function validateDate(z) {
    const data = Array.from(z).every(x => x.value !== '')
    if (data) {
        if (z.length === 3) {
            if (z[1].value === z[2].value) {
                return z.slice(0,2)
            }
                errorHandler({e:'Wrong input data!'})
        }
        return z
    }
    errorHandler({e:'Wrong input data!'})
}

function errorHandler(e) {
    throw new Error(`${e.message}`)
}

function fetchData(baseUrl, uri, headers = {}) {
    const url = uri !== '' ? `${baseUrl}${uri}` : baseUrl

    return fetch(url, headers)
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

function clearData(z) {
    z.map( x => x.value = '')
}

function setUserToken(x){
    sessionStorage.setItem('token', x.accessToken)
    sessionStorage.setItem('user', x._id)
}

function removeUserToken() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
}

function catchTemplate(x) {
    const user = sessionStorage.getItem('user')
    return `
    <div class="catch" id="${x._id}">
        <label>Angler</label>
        <input type="text" class="angler" value="${x.angler}" />
        <hr>
        <label>Weight</label>
        <input type="number" class="weight" value="${x.weight}" />
        <hr>
        <label>Species</label>
        <input type="text" class="species" value="${x.species}" />
        <hr>
        <label>Location</label>
        <input type="text" class="location" value="${x.location}" />
        <hr>
        <label>Bait</label>
        <input type="text" class="bait" value="${x.bait}" />
        <hr>
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="${x.captureTime}" />
        <hr>
        <button ${x._ownerId === user ? '' : 'disabled'} name="update" class="update" >Update</button>
        <button ${x._ownerId === user ? '' : 'disabled'} name="delete" class="delete">Delete</button>
    </div>    
    `
}


export {
    validateDate,
    fetchData,
    serverResponse,
    clearData,
    errorHandler,
    setUserToken,
    removeUserToken,
    catchTemplate,
    urls,
}