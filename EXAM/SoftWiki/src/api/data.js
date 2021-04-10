import * as api from "../api/api.js";

const host = 'http://localhost:3030'
api.settings.host = host

export const login = api.login
export const logout = api.logout
export const register = api.register

export async function getAllCategory() {
    return await api.get(host + `/data/wiki?sortBy=_createdOn%20desc&distinct=category`)
}

export async function getAllArticles() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc')
}

export async function getArticle(id) {
    return await api.get(host + '/data/wiki/' + id)
}

export async function createAtricle(x) {
    return await api.post(host + '/data/wiki', x)
}

export async function editArticle(id, x) {
    return await api.put(host + '/data/wiki/' + id, x )
}

export async function deleteArticle(id) {
    return await api.del(host + '/data/wiki/' + id)
}

export async function getSearch(query) {
    return await api.get(host + `/data/wiki?where=title%20LIKE%20%22${query}%22`)
}



