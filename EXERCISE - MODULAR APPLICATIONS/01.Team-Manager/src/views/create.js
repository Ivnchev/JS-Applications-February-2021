
import { t } from "../templates/create-edit.js";
import { validate as action } from "../helpers/helpers.js";



export async function create(ctx) {

    ctx.render(t(onSubmit))

    async function onSubmit(e) {
        e.preventDefault()
        const inputs = Array.from(e.target.querySelectorAll('input'))
        const data = [...new FormData(e.target).entries()]
        const x = data.reduce((a, b) => Object.assign(a, { [b[0]]: b[1] }), {})
        inputs.forEach(x => x.disabled = true)
        try {
            action(x, ctx)
        } finally {
            inputs.forEach(x => x.disabled = false)
            e.target.reset()
        }
    }
}
