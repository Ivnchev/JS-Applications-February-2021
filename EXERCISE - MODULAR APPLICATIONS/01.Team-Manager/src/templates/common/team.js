import { html } from "../../../node_modules/lit-html/lit-html.js";


export const t = t => html`<article class="layout">
<img src=${t.logoUrl} class="team-logo left-col">
<div class="tm-preview">
    <h2>${t.name}</h2>
    <p>${t.description}</p>
    <span class="details">${t.mCount} Members</span>
    <div><a href="/details/${t._id}" class="action">See details</a></div>
</div>
</article>`