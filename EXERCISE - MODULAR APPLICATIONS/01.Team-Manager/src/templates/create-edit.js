import { html } from "../../node_modules/lit-html/lit-html.js";


export const t = (s, isEdit) => html`
<section id="create">
<article class="narrow">
    <header class="pad-med">
        ${
    isEdit ? html`<h1>Edit Team</h1>` : html`<h1>New Team</h1>`
    }
    </header>
    <form id=${isEdit ? "edit-form" : "create-form"} class="main-form pad-large" @submit=${s}>
        <div class="error"></div>
        ${
    isEdit
        ? html`<label>Team name: <input type="text" name="name" .value=${isEdit.name}></label>
                <label>Logo URL: <input type="text" name="logoUrl" .value=${isEdit.logoUrl}></label>
            <label>Description: <textarea name="description" .value=${isEdit.description}></textarea></label>`
        : html`<label>Team name: <input type="text" name="name"></label>
        <label>Logo URL: <input type="text" name="logoUrl"></label>
        <label>Description: <textarea name="description"></textarea></label>`
    }
        <input class="action cta" type="submit" value=${isEdit ? "Save Changes" : "Create Team"}>
    </form>
</article>
</section>`


