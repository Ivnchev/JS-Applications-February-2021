import { html } from "../../node_modules/lit-html/lit-html.js";



export const t = (x, user, del) => html`
<section id="details-page" class="content details">
<h1>${x.title}</h1>

<div class="details-content">
    <strong>Published in category ${x.category}</strong>
    <p>${x.content}</p>

    <div class="buttons">
        ${
            user === x._ownerId
            ? html`<a @click=${del} href="javascript:void(0)" class="btn delete">Delete</a>
        <a href="/edit/${x._id}" class="btn edit">Edit</a>`
            : html`<a href="/" class="btn edit">Back</a>`
        }
    </div>
</div>
</section>`