import { html } from "../../../node_modules/lit-html/lit-html.js";



export const record = (x) => html`
<a class="article-preview" href="/details/${x._id}">
    <article>
        <h3>Topic: <span>${x.title}</span></h3>
        <p>Category: <span>${x.category}</span></p>
    </article>
</a>`