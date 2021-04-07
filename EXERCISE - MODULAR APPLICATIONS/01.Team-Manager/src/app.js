import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { until } from "../../node_modules/lit-html/directives/until.js";
import * as api from "../api/data.js";

import { nav } from "./views/nav.js";
import { loader } from "./templates/common/loader.js";

import { home } from "./views/home.js";
import { browse } from "./views/browse.js";
import { myTeams } from "./views/myTeams.js";
import { create } from "./views/create.js";
import { details } from "./views/details.js";
import { edit } from "./views/edit.js";


import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";

const main = document.querySelector('main')
const header = document.querySelector('#titlebar')

page('/', ctxDecorator, home)
page('/browse', ctxDecorator, browse)
page('/my-teams', ctxDecorator, myTeams)
page('/create', ctxDecorator, create)
page('/details/:id', ctxDecorator, details)
page('/edit/:id', ctxDecorator, edit)


page('/login', ctxDecorator, loginView)
page('/register', ctxDecorator, registerView)

page.start()


function ctxDecorator(ctx, next) {
    
    ctx.render = (content) => render(content, main)
    ctx.until = (main, loader) => until(main, loader)
    ctx.loader = loader
    nav(header,ctx)
    next()
}
