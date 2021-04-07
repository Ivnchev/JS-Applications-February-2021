import { t } from "../templates/browse.js";

import { getOwnTeams } from "../../api/data.js";


export async function myTeams(ctx, next) {

    const r = await getOwnTeams()
    const user = JSON.parse(sessionStorage.getItem('userData'))
    ctx.render(t(r, user))
}