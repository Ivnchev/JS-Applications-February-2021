
import { createTeam, editTeam } from "../../api/data.js";



export async function validate(data, ctx, id) {
    
    try {
        const check = Object.values(data).every(x => x !== '')
        if (check == false) { throw new Error('All fields are required!') }
        if (data.name.length < 4) { throw new Error('Team name must be at least 4 chars!') }
        if (data.description.length < 10) { throw new Error('Team description must be at least 10 chars!') }
        
        const r = id === undefined 
        ? await createTeam(data) 
        : await editTeam(id, data)
        
        ctx.page.redirect(`/details/${r._id}`)
    } catch (e) {
        // ctx.render(t(onSubmit, e.message))
        if(id === undefined){
            document.querySelector('#create-form>.error').innerHTML = e.message
            setTimeout(() => {
                document.querySelector('#create-form>.error').innerHTML = ''
            }, 3000)
        }else {
            document.querySelector('#edit-form>.error').innerHTML = e.message
            setTimeout(() => {
                document.querySelector('#edit-form>.error').innerHTML = ''
            }, 3000)
        }
    }
}