
import { t } from "../templates/catalog.js";

import { getFurnitures, getMyFurnitures} from "../api/data.js";


export async function furnitures(ctx, next) {
    const r = await getFurnitures()
    ctx.render(t(r))
}


export async function myFurnitures(ctx, next) {
    const r = await getMyFurnitures()
    ctx.render(t(r, true))
}

