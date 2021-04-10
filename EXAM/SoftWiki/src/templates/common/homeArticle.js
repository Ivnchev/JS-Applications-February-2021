import { html } from "../../../node_modules/lit-html/lit-html.js";



export const record = (x) => html`
<article>
<h3>${x.title}</h3>
<p>${x.content}</p>
<a href="/details/${x._id}" class="btn details-btn">Details</a>
</article>`