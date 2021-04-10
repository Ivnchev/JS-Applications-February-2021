import * as api from "../api/api.js";

const host = 'http://localhost:3030'
api.settings.host = host

export const login = api.login
export const logout = api.logout
export const register = api.register

export async function getFurnitures() {
    return await api.get(host + '/data/catalog')
}

export async function getFurnitureById(id) {
    return await api.get(host + '/data/catalog/' + id)
}

export async function getMyFurnitures() {
    const id = sessionStorage.getItem('user')
    return await api.get(host + `/data/catalog?where=_ownerId%3D%22${id}%22`)
}

export async function createFurniture(data) {
    return await api.post(host + '/data/catalog', data)
}

export async function editFurniture(id, data) {
    return await api.put(host + '/data/catalog/' + id, data)
}

export async function deleteFurniture(id) {
    return await api.del(host + '/data/catalog/' + id)
}