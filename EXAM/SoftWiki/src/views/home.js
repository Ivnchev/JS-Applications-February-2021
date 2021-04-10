
import { t } from "../templates/home.js";
import { getAllCategory } from "../api/data.js";



export async function home(ctx, next) {
    const r = await getAllCategory()
    const data = {
        js : r.filter(x => x.category === 'JavaScript'),
        python : r.filter(x => x.category === 'Python'),
        csharp : r.filter(x => x.category === 'C#'),
        java : r.filter(x => x.category === 'Java'),
    }

    ctx.render(t(data))

}