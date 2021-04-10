import { html } from "../../node_modules/lit-html/lit-html.js";

import { logout } from "../api/data.js";

const t = (user, s) => html`
<a href="/catalog">Catalogue</a>
<a href="/search">Search</a>
${
    user
    ? html`<div id="user">
    <a href="/create">Create</a>
    <a @click=${s} href="javascript:void(0)">Logout</a>
    </div>`
    : html`<div id="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>`
}

`


export function nav(ctx, user) {
    return t(user, onClick)

    async function onClick(e) {
        e.preventDefault()

            await logout()
            ctx.page.redirect('/')
    }
}