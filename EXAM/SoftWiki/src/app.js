import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";

const navigation = document.querySelector('nav.nav-buttons')
const main = document.querySelector('main#main-content')

import { login, register } from "./views/auth.js";
import { nav } from "./views/nav.js";
import { home } from "./views/home.js";
import { catalog } from "./views/catalog.js";
import { create } from "./views/create.js";
import { details } from "./views/details.js";
import { edit } from "./views/edit.js";
import { search } from "./views/search.js";


page('/', ctxDecorator, home)
page('/login', ctxDecorator, login)
page('/register', ctxDecorator, register)
page('/catalog', ctxDecorator, catalog)
page('/create', ctxDecorator, create)
page('/details/:id', ctxDecorator, details)
page('/edit/:id', ctxDecorator, edit)
page('/search', ctxDecorator, search)



page.start()


function ctxDecorator(ctx, next) {
    
    const user = JSON.parse(sessionStorage.getItem('userData'))
    
    ctx.render = c => render(c, main)

    render(nav(ctx,user), navigation)
    next()
}