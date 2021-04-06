import { html } from "./node_modules/lit-html/lit-html.js";

export const t = (t) => html`<ul>
${ t.map(x => html`
<li>
    <img src="./images/${x.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn">Show status code</button>
        <div class="status" style="display: none" id="${x.id}">
            <h4>Status Code: ${x.statusCode}</h4>
            <p>${x.statusMessage}</p>
        </div>
    </div>
</li>
`)
}
</ul>`

