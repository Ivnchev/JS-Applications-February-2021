import { t } from "../templates/home.js";


export async function home(ctx, next) {
    const user = sessionStorage.getItem('userData')
    if(user !== null){
        ctx.render(t(user))
    } else {
        ctx.render(t())
    }

}