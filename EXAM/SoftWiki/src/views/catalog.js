
import { t } from "../templates/catalog.js";
import { getAllArticles } from "../api/data.js";



export async function catalog(ctx, next) {
    const r = await getAllArticles()
    ctx.render(t(r))
}