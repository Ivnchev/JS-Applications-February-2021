import { html } from "../node_modules/lit-html/lit-html.js"

export const t = (t, user) => html`
<div class="row space-top">
    <div class="col-md-12">
        ${
    user
        ? html`<h1>My Furniture</h1><p>This is a list of your publications.</p>`

        : html`<h1>Welcome to Furniture System</h1><p>Select furniture from the catalog to view details.</p>`
    }
    </div>
</div>
<div class="row space-top">
    ${t.map(item)}
</div>`



const item = x => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${x.img} />
            <p>${x.description}</p>
            <footer>
                <p>Price: <span>${x.price} $</span></p>
            </footer>
            <div>
                <a href="/details/${x._id}" class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>`


