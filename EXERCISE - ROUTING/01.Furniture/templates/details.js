import { html } from "../node_modules/lit-html/lit-html.js"


export const t = (x, e, user) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>Furniture Details</h1>
            </div>
        </div>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <img src=${x.img} />
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <p>Make: <span>${x.make}</span></p>
                <p>Model: <span>${x.model}</span></p>
                <p>Year: <span>${x.year}</span></p>
                <p>Description: <span>${x.description}</span></p>
                <p>Price: <span>${x.price}</span></p>
                ${
                    x.material 
                    ? html `<p>Material: <span>${x.material}</span></p>`
                    : ''
                }
                ${
                    user === x._ownerId
                ? html`<div>
                    <a href="/edit/${x._id}" class="btn btn-info">Edit</a>
                    <a href="javascript:void(0)" class="btn btn-red" @click=${e}>Delete</a>
                    </div>`
                : ``
                }
            </div>
        </div>`