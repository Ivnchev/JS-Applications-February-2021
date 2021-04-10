
import { t } from "../templates/search.js";
import { getSearch } from "../api/data.js";



export async function search(ctx, next) {
    let query = ctx.querystring.split('=')[1] || ''
    
    const r = query === '' ? [] : await getSearch(query)

    ctx.render(t(r, onSubmit, query))

    async function onSubmit(e) {
        e.preventDefault()
        const data = [...new FormData(e.target).entries()]
       
            ctx.page.redirect('/search?=' + data[0][1])
    }
}