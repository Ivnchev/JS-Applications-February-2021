
import { t } from "../templates/register.js";

import { register } from "../../api/data.js";


export async function registerView(ctx, next) {

    ctx.render(t(onSubmit))

    async function onSubmit(e) {
        e.preventDefault()
        const data = [...new FormData(e.target).entries()]
        const x = data.reduce((a, b) => Object.assign(a, { [b[0]]: b[1] }), {})
        validate(x)
    }

    async function validate(x) {
        try {
            const check = Object.values(x).every(x => x !== '')
            if (check == false) { throw new Error('All fields are required!') }
            if (! new RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z]+/gi).test(x.email)) { throw new Error('Email is incorrect!') }
            if (x.username.length < 4) { throw new Error('The username must be at least 4 char!') }
            if (x.password.length < 4) { throw new Error('The password must be at least 4 char!') }
            if (x.password !== x.repass) { throw new Error('Passwords don\'t match!') }

            await register(x.email, x.username, x.password)
            ctx.page.redirect('/my-teams')
            
        } catch (e) {
            document.querySelector('#register-form>.error').innerHTML = e.message
            setTimeout(() => {
                document.querySelector('#register-form>.error').innerHTML = ''
            }, 3000)
            // ctx.render(t(onSubmit, e.message))
        }
    }
}
