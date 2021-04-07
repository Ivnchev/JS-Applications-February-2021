import * as api from "../api/api.js";

const host = 'http://localhost:3030'
api.settings.host = host

export const login = api.login
export const logout = api.logout
export const register = api.register

export async function getTeams() {
    const teams =  await api.get(host + '/data/teams')
    const members = await getMembers(teams.map(x => x._id))
    teams.map(x => x.mCount = members.filter(m => m.teamId == x._id).length );
    return teams
}

export async function getOwnTeams() {
    const id = JSON.parse(sessionStorage.getItem('userData')).userId
    const teams = await api.get(host + `/data/teams?where=_ownerId%3D%22${id}%22`)
    const members = await getMembers(teams.map(x => x._id))

    teams.map(x => x.mCount = members.filter(m => m.teamId == x._id).length )
    return teams
}

export async function getTeamById(id) {
    return await api.get(host + '/data/teams/' + id)
}

export async function createTeam(data) {
    const result =  await api.post(host + '/data/teams', data)
    const req = await joinMember(result._id)
    await acceptMember(req)

    return result
}

export async function editTeam(id, data) {
    return await api.put(host + '/data/teams/' + id, data)
}

export async function joinMember(teamId) {
    const body = { teamId }
    return await api.post(host + '/data/members', body)
}
export async function getRequestsByTeamId(teamId) {
    return await api.get(host + `/data/members?where=teamId%3D%22${teamId}%22`);
}


export async function getMembersByTeamId(teamId) {
    return await api.get(host + `/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`);
}

export async function acceptMember(data) {
    const body = {
        teamId : data.teamId,
        status : 'member'
    }
    return await api.put(host + '/data/members/' + data._id , body)
}

export async function cancelRequest(id) {
    return await api.del(host + '/data/members/' + id)
}

export async function getMembers(teamsId) {
    const query = encodeURIComponent(`teamId IN ("${teamsId.join('", "')}") AND status="member"`)
    return await api.get(host + `/data/members?where=${query}`)
}




// export async function getMembership() {
//     const id = sessionStorage.getItem('user')
//     return await api.get(host + `/data/members?where=_ownerId%3D%22${id}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`)
// }



// export async function getAllMembers(teamId) {
//     return await api.get(host + `/data/members?where=teamId%3D%22${teamId}%22%20AND%20status%3D%22member%22&load=user%3DuserId%3Ausers`)
// }

// export async function listOfPending(teamId) {
//     return await api.get(host + `/data/members?where=teamId%3D%22${teamId}%22%20AND%20status%3D%22pending%22&load=user%3DuserId%3Ausers`)
// }