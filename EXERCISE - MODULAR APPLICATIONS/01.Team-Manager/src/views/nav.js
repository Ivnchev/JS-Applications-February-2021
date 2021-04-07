import { html, render } from "../../node_modules/lit-html/lit-html.js"
import { logout } from "../../api/data.js";

export const t = (user, s) => html`
<a href="/" class="site-logo">Team Manager</a>
    <nav>
        ${
    user
        ? html`<a href="/browse" class="action">Browse Teams</a>
            <a href="/my-teams" class="action">My Teams</a>
            <a href="javascript:void(0)" class="action" @click=${s}>Logout</a> `
        : html`<a href="/browse" class="action">Browse Teams</a>
            <a href="/login" class="action">Login</a>
            <a href="/register" class="action">Register</a>`
    }    
    </nav>`


export function nav(header, ctx) {
    const user = sessionStorage.getItem('userData')
    render(t(user, onClick), header)

    async function onClick(e) {
        e.preventDefault()
        await logout()
        ctx.page.redirect('/')
    }
}