import { html } from "../../node_modules/lit-html/lit-html.js";

import { record } from "./common/catalogArticles.js";

export const t = articles => html`
<section id="catalog-page" class="content catalogue">
<h1>All Articles</h1>

${
    articles.length === 0
    ? html`<h3 class="no-articles">No articles yet</h3>`
    : articles.map(record)
}

<!-- No articles message -->

</section>`