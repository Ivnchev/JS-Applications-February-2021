
import { tCreate , tEdit} from "../templates/create-edit.js";
import { createFurniture , getFurnitureById, editFurniture } from "../api/data.js";



export async function create(ctx, next) {
    
    ctx.render(tCreate(onSubmit, validate))

    async function onSubmit(e) {
        e.preventDefault()
        const data = [...new FormData(e.target).entries()]

        const validate = data.slice(0, data.length - 1).every( x => x[1] !== '')
        if(validate){
            const body = data.reduce( (a,b) => Object.assign(a, {[b[0]]: b[1]}), {})
            const r = await createFurniture(body)
            ctx.page.redirect(`/details/${r._id}`)
        }
    }

}

export async function edit(ctx, next) {

    const r = await getFurnitureById(ctx.params.id)

    ctx.render(tEdit(onSubmit, validate, r))

    async function onSubmit(e) {
        e.preventDefault()
        const data = [...new FormData(e.target).entries()]

        const validate = data.slice(0, data.length - 1).every( x => x[1] !== '')

        if(validate){
            const body = data.reduce( (a,b) => Object.assign(a, {[b[0]]: b[1]}), {})
            
            const r = await editFurniture(ctx.params.id, body)

            ctx.page.redirect(`/details/${r._id}`)   
        }
    }
}


async function validate(e) {
    if(e.target.id == 'new-model'){
        if(e.target.value.length >= 4) {
            e.target.className = 'form-control is-valid'
        } else {
            e.target.className = 'form-control is-invalid'
            alert('The model is to short!')
        }
    }
    if(e.target.id == 'new-year'){
        if(e.target.value > 1950 && e.target.value < 2050){
            e.target.className = 'form-control is-valid' 
        } else {
            e.target.className = 'form-control is-invalid'
            alert('The year is incorrect!')
        }
    }
}