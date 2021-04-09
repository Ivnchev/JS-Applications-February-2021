const baseUrl = 'http://localhost:3030/jsonstore/collections';

function makeHeaders(httpMethod, data) {
    const headers = {
        method: httpMethod,
    }
    if (httpMethod === 'POST' || httpMethod === 'PUT') {
        headers.body = JSON.stringify(data);
    }
    return headers;
}

function handler(data) {
    if (!data.ok) {
        throw new Error(data.status)
    }
    return data.json();
}

function fetchData(endpoint, headers) {
    const url = `${baseUrl}/${endpoint}`;

    return fetch(url, headers)
        .then(handler)

}

export function get( endpoint) {
    const headers = makeHeaders('GET');
    return fetchData( endpoint, headers);
}

export function post( endpoint, data) {
    const headers = makeHeaders('POST', data);
    return fetchData( endpoint, headers);
}
export function put( endpoint, data) {
    const headers = makeHeaders('PUT', data);
    return fetchData( endpoint, headers);
}
export function del( endpoint) {
    const headers = makeHeaders('DELETE');
    return fetchData( endpoint, headers);
}
