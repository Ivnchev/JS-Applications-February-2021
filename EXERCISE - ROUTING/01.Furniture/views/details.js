import { t } from "../templates/details.js";
import { getFurnitureById, deleteFurniture } from "../api/data.js";



export async function details(ctx, next) {
    
    const r = await getFurnitureById(ctx.params.id)
    const user = sessionStorage.getItem('user')
    ctx.render(t(r, onDelete, user))
    
    async function onDelete(e) {
        e.preventDefault()
        const c = confirm('Are you sure?')
        if(c){
            const r = deleteFurniture(ctx.params.id)
            ctx.page.redirect('/')
        }
    }
    
}