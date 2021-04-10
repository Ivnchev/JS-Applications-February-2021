
export const settings = {
    host : ''
}

async function request(url, params) {
    try {
        const r = await fetch(url, params)

        if(r.ok === false){
            const error = await r.json()
            throw new Error(error.message)
        }

        try{
            const data = await r.json()
            return data
        }catch(err){
            return r
        }

    } catch (e){
        alert(e.message)
        throw e
    }
}

export function headersFactory(method = "get", body) {
    const params = {
        method,
        headers: {}
    }

    const token = sessionStorage.getItem('token')
    if(token !== null){
        params.headers['X-Authorization'] = token
    }

    if(body){
        params.headers['Content-Type'] = 'application/json'
        params.body = JSON.stringify(body)
    }

    return params
}

export async function get(url) {
    return await request(url, headersFactory())    
}

export async function post(url, data) {
    return await request(url, headersFactory('post', data))    
}

export async function put(url, data) {
    return await request(url, headersFactory('put', data))    
}

export async function del(url) {
    return await request(url, headersFactory('delete'))    
}

export async function login(email, password) {
    const r = await post(settings.host + '/users/login', {email, password})
    setUserData(r)
    return r
}

export async function register(email, password) {
    const r = await post(settings.host + '/users/register', {email, password})
    setUserData(r)
    return r
}

export async function logout() {
    const r = await get(settings.host + '/users/logout')
    removeUserData()
    return r
}


export function setUserData(x) {
    sessionStorage.setItem('token', x.accessToken)
    sessionStorage.setItem('email', x.email)
    sessionStorage.setItem('user', x._id)
}
export function removeUserData() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('user')
}
