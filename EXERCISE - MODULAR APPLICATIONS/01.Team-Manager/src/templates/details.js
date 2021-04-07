import { html } from "../../node_modules/lit-html/lit-html.js";

 
export const t = (c) => html`
<section id="team-home">
    <article class="layout">
        <img src="${c.team.logoUrl}" class="team-logo left-col">
        <div class="tm-preview">
            <h2>${c.team.name}</h2>
            <p>${c.team.description}</p>
            <span class="details">${c.members.length} Members</span>
            <div>
                    ${controlUser(c)}
            </div>
        </div>
        <div class="pad-large">
            <h3>Members</h3>
            <ul class="tm-members">
                <li>My Username</li>
                ${c.members.map(x => members(x, c.owner, x._ownerId === c.userData.userId))}
            </ul>
        </div>
        ${c.owner ?
        html`<div class="pad-large">
            <h3>Membership Requests</h3>
            <ul class="tm-members">
                ${c.pending ? c.pending.map(requests) : '' }                
            </ul>
        </div>` : ''
        }
    </article>
</section>`

function controlUser(c) {
    
    if(c.userData === null) { return '' }
    const currentUser = c.allMembers.find(x => x.user._id === c.userData.userId)
    if (c.owner) {
        return html`<a href="/edit/${c.team._id}" class="action">Edit team</a>`
    } else if (currentUser && currentUser.status === 'member') {
        return html`<a @click=${e => c.leave(e, c.allMembers._id)} href="javascript:void(0)" class="action invert">Leave team</a>`
    } else if (currentUser && currentUser.status === 'pending'){
        return html`Membership pending. <a  @click=${e => c.leave(e, currentUser._id)} href="javascript:void(0)">Cancel request</a>`
    } else {
        return html`<a @click=${c.join} href="javascript:void(0)" class="action">Join team</a>`
    }
}

const requests = m => html`<li>
    ${m.user.username}
    <a @click=${m.approve} href="javascript:void(0)" class="tm-control action">Approve</a>
    <a @click=${m.decline} href="javascript:void(0)"class="tm-control action">Decline</a>
</li>`

const members = (m, isOwner, isSelf) => html`
<li> ${isSelf ? 'You: ' : ''}  ${m.user.username} 
${(isOwner && !isSelf) 
    ? html`<a @click=${m.decline} href="javascript:void(0)" class="tm-control action">Remove from team</a>` 
    : '' }
</li>`
