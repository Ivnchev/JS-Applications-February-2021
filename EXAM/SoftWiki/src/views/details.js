
import { t } from "../templates/details.js";
import { getArticle, deleteArticle } from "../api/data.js";


export async function details(ctx, next) {
    let user = JSON.parse(sessionStorage.getItem('userData'))
    user = user ? user.userId : undefined
    const r = await getArticle(ctx.params.id)

    ctx.render(t(r, user, onDelete))

    async function onDelete(e) {
        e.preventDefault()

        const c = confirm('Are you sure?')
        if(c){
            await deleteArticle(ctx.params.id)
            ctx.page.redirect('/')
        }
    }

}