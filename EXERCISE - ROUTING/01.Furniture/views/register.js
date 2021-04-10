
import { t } from "../templates/register.js";
import { register } from "../api/data.js";



export async function registerView(ctx, next) {
    
    ctx.render(t(onSubmit))    

    async function onSubmit(e) {
        e.preventDefault()
        const data = [...new FormData(e.target).entries()]
        
        const validate = data.every( x => x[1] !== '')
        if(validate){
           const x = data.reduce( (a,b) => Object.assign(a, {[b[0]]: b[1]}), {})
           if(x.password !== x.rePass){
               alert('Password don\'t match!')
               return
           }

           const r = await register(x.email, x.password)
           ctx.page.redirect('/')
        }

    }
}