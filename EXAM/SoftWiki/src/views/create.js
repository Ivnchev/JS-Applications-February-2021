
import { t } from "../templates/create.js";
import { createAtricle } from "../api/data.js";


export async function create(ctx, next) {

    ctx.render(t(onSubmit))

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
            const r = await createAtricle(x)
            ctx.page.redirect('/')
        } catch (e) {
            alert(e.message)
        }

    }
}