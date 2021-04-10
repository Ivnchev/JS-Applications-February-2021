import { html } from "../../node_modules/lit-html/lit-html.js";

import { record } from "./common/catalogArticles.js";


export const t = (search, s, query) => html`
<section id="search-page" class="content">
<h1>Search</h1>
<form @submit=${s} id="search-form">
    <p class="field search">
        <input type="text" placeholder="Search by article title" name="search" .value=${query}>
    </p>
    <p class="field submit">
        <input class="btn submit" type="submit" value="Search">
    </p>
</form>
<div class="search-container">
    
    ${
    search.length === 0
        ? html`<h3 class="no-articles">No matching articles</h3>`
        : search.map(record)
    }
    
</div>
</section>`