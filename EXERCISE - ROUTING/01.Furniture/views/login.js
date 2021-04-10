
import { t } from "../templates/login.js";
import { login } from "../api/data.js";



export async function loginView(ctx, next) {
    
    ctx.render(t(onSubmit))    

    async function onSubmit(e) {
        e.preventDefault()
        const data = [...new FormData(e.target).entries()]
        
        const validate = data.every( x => x[1] !== '')
        if(validate){
           const x = data.reduce( (a,b) => Object.assign(a, {[b[0]]: b[1]}), {})

           const r = await login(x.email, x.password)
           ctx.page.redirect('/')
        }

    }
}