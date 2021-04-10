import { html, render } from "../node_modules/lit-html/lit-html.js"
import { logout } from "../api/data.js";

export const t = (user, s) => html`
<h1><a href="/">Furniture Store</a></h1>
<nav>
    <a id="catalogLink" href="/" class="active">Dashboard</a>
    ${
    user
        ? html`<div id="user">
            <a id="createLink" href="/create" >Create Furniture</a>
            <a id="profileLink" href="/my-furniture" >My Publications</a>
            <a id="logoutBtn" href="javascript:void(0)" @click=${s}>Logout</a>
        </div>`
        : html`<div id="guest">
            <a id="loginLink" href="/login">Login</a>
            <a id="registerLink" href="/register">Register</a>
        </div>`
    }
</nav>
`


export function nav(header, ctx) {
    const user = sessionStorage.getItem('user')
    render(t(user, onClick), header)


    async function onClick(e) {
        e.preventDefault()
        const x = await logout()
        ctx.page.redirect('/')
    }
}

