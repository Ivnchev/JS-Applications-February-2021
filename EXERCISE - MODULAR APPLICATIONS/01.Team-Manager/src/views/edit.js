
import { t } from "../templates/create-edit.js";
import { validate as action } from "../helpers/helpers.js";
import { getTeamById } from "../../api/data.js";


export async function edit(ctx) {
    const id = ctx.params.id

    ctx.render(ctx.until(waiting(id, ctx), ctx.loader()))
}

async function waiting(id, ctx) {

    const team = await getTeamById(id)
    return t(onSubmit, team)

    function onSubmit(e) {
        e.preventDefault()
        const inputs = Array.from(e.target.querySelectorAll('input'))
        const data = [...new FormData(e.target).entries()]
        const x = data.reduce((a, b) => Object.assign(a, { [b[0]]: b[1] }), {})
        inputs.forEach(x => x.disabled = true)
        try {
            action(x, ctx, id)
        } finally {
            inputs.forEach(x => x.disabled = false)
            e.target.reset()
        }
    }

}