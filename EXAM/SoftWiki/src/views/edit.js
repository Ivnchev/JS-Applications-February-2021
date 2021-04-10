
import { t } from "../templates/edit.js";
import { editArticle, getArticle } from "../api/data.js";


export async function edit(ctx, next) {
    const article = await getArticle(ctx.params.id)

    ctx.render(t(article, onSubmit))

    async function onSubmit(e) {
        e.preventDefault()
        const categories = ["JavaScript", "C#", "Java", "Python"]
        const data = [...new FormData(e.target).entries()]
        const x = data.reduce((a, b) => Object.assign(a, { [b[0]]: b[1] }), {})
        try {
            if (Object.values(x).every(x => x == '')) {
                throw new Error('All fields are required!')
            }
            if(!categories.includes(x.category)){
                throw new Error('Category is incorrect!')
            }
            const r = await editArticle(ctx.params.id, x)
            ctx.page.redirect('/details/' + r._id)
        } catch (e) {
            alert(e.message)
        }

    }
}