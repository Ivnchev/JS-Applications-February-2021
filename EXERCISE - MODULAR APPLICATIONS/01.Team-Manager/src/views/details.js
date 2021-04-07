import { html } from "../../node_modules/lit-html/lit-html.js";
import { t } from "../templates/details.js";

import { getTeamById, joinMember, getMembersByTeamId, cancelRequest, acceptMember} from "../../api/data.js";

export async function details(ctx) {
    const teamId = ctx.params.id

    ctx.render(ctx.until(waiting(teamId), ctx.loader()))

    async function waiting(id) {
        const userData = JSON.parse(sessionStorage.getItem('userData'))
     
        const [team, allMembers] = await Promise.all([
            getTeamById(id),
            getMembersByTeamId(id)
        ])
        allMembers.map( x => {
            x.approve = (e) => approve(e,x),
            x.decline = (e) => leave(e, x._id)
        })
        
        const controls = {
            team,
            join,
            leave, 
            approve,
            userData,
            allMembers,
            owner : userData.userId === team._ownerId,
            members : allMembers.filter(x => x.status === 'member'),
            pending : allMembers.filter(x => x.status === 'pending'),
        }

        return t(controls)
    
    
        async function join(e) {

            await joinMember(id)
            ctx.page.redirect(`/details/${id}`)
        }
        async function leave(e, reqId) {
            await cancelRequest(reqId)
            ctx.page.redirect(`/details/${id}`)
        }
        async function approve(e, req) {

            await acceptMember(req)
            ctx.page.redirect(`/details/${id}`)
        }
    
    }
}

