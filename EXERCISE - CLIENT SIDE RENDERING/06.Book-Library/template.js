import { html } from "./node_modules/lit-html/lit-html.js";

export const t = x =>
    html`${x.map(z =>
        html`<tr>
            <td>${z.title}</td>
            <td>${z.author}</td>
            <td id="${z._id}">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
            </td>
        </tr>`)}`