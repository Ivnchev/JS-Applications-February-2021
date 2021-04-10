import { html } from "../../node_modules/lit-html/lit-html.js";


export const t = (x,s) => html`
<section id="edit-page" class="content">
<h1>Edit Article</h1>

<form @submit=${s} id="edit" action="#" method="">
    <fieldset>
        <p class="field title">
            <label for="title">Title:</label>
            <input type="text" name="title" id="title" placeholder="Enter article title" .value=${x.title}>
        </p>

        <p class="field category">
            <label for="category">Category:</label>
            <input type="text" name="category" id="category" placeholder="Enter article category" .value=${x.category}>
        </p>
        <p class="field">
            <label for="content">Content:</label>
            <textarea name="content" id="content" .value=${x.content}></textarea>
        </p>

        <p class="field submit">
            <input class="btn submit" type="submit" value="Save Changes">
        </p>

    </fieldset>
</form>
</section>`