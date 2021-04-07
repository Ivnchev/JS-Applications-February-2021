
import { t } from "../templates/browse.js";

import { getTeams } from "../../api/data.js";



export async function browse(ctx) {
    const user = JSON.parse(sessionStorage.getItem('userData'))
    const r = await getTeams()
    ctx.render(t(r, user))

}
