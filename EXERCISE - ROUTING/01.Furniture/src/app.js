import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import * as api from "../api/data.js";

import { furnitures, myFurnitures } from "../views/home.js";
import { nav } from "../views/nav.js";

import { loginView } from "../views/login.js";
import { registerView } from "../views/register.js";
import { details } from "../views/details.js";
import { create , edit } from "../views/create-edit.js";


window.api = api
const main = document.querySelector('.container')
const header = document.querySelector('header')

page('/', ctxDecorator, furnitures)
page('/my-furniture', ctxDecorator, myFurnitures)
page('/login', ctxDecorator, loginView)
page('/register', ctxDecorator, registerView)

page('/create', ctxDecorator, create)
page('/details/:id', ctxDecorator, details)
page('/edit/:id', ctxDecorator, edit)


page.start()

function ctxDecorator(ctx, next) {

    ctx.render = x => render(x, main)

    nav(header, ctx)

    next()
}

