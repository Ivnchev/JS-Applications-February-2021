

import { loginTemplate, registerTemplate } from "../templates/auth.js";
import { login as apiLogin , register as apiRegister } from "../api/data.js";


export async function login(ctx) {
    
    ctx.render(loginTemplate(onSubmit))

    async function onSubmit(e) {
        e.preventDefault()

        const data = [...new FormData(e.target).entries()]
        const x = data.reduce( (a,b) => Object.assign(a, {[b[0]] : b[1]}), {})
        
        try{
        if(x.email == '' || x.password == ''){
            throw new Error('The email or password are incorrect!')
        }

        await apiLogin(x.email, x.password)
        ctx.page.redirect('/')
        } catch(e){
            alert(e.message)
        }
    }
}

export async function register(ctx) {
    
    ctx.render(registerTemplate(onSubmit))

    async function onSubmit(e) {
        e.preventDefault()
        const data = [...new FormData(e.target).entries()]
        const x = data.reduce( (a,b) => Object.assign(a, {[b[0]] : b[1]}), {})
    try{    
        if(Object.values(x).every(x => x === '')){
            throw new Error('All fields are required!')
        }
        if(x.email == '' || x.password == ''){
            throw new Error('The email or password are incorrect!')
        }
        if(x.password !== x['rep-pass']){
            throw new Error('The passwords don\'t match!')
        }
        await apiRegister(x.email, x.password)
        ctx.page.redirect('/')
    } catch(e){
        alert(e.message)
    }
    }

}