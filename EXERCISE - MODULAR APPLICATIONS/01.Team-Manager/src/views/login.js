
import { t } from "../templates/login.js";

import { login } from "../../api/data.js";

export async function loginView(ctx, next) {

    ctx.render(t(onSubmit))

    async function onSubmit(e) {
        e.preventDefault()
        const inputs = Array.from(e.target.querySelectorAll('input'))
        const data = [...new FormData(e.target).entries()]
        const x = data.reduce((a, b) => Object.assign(a, { [b[0]]: b[1] }), {})
        validate(x, inputs)
        e.target.reset()
       
    }

    async function validate(x, inputs) {
        try{
            inputs.forEach(x => x.disabled = true)
            const check = Object.values(x).every(x => x !== '')
            if (check == false) { throw new Error('All fields are required!') }
            await login(x.email, x.password)
            ctx.page.redirect('/my-teams')
    
        }catch (e) {
            // ctx.render(t(onSubmit, e.message))
            document.querySelector('#login-form>.error').innerHTML = e.message
            setTimeout(() => {
                document.querySelector('#login-form>.error').innerHTML = ''
            }, 3000)
        } finally {
            inputs.forEach(x => x.disabled = false)
        }
    
    }

}


