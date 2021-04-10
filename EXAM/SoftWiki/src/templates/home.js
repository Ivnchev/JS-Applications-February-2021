import { html } from "../../node_modules/lit-html/lit-html.js";

import { record } from "./common/homeArticle.js";

export const t = (c) => html`
<section id="home-page" class="content">
<h1>Recent Articles</h1>
<section class="recent js">
    <h2>JavaScript</h2>
    ${
        c.js.length === 0 
        ? html`<h3 class="no-articles">No articles yet</h3>`
        : c.js.map(record)

    }
</section>
<section class="recent csharp">
    <h2>C#</h2>
    ${
        c.csharp.length === 0 
        ? html`<h3 class="no-articles">No articles yet</h3>`
        : c.csharp.map(record)

    }
</section>
<section class="recent java">
    <h2>Java</h2>
    ${
        c.java.length === 0 
        ? html`<h3 class="no-articles">No articles yet</h3>`
        : c.java.map(record)

    }
</section>
<section class="recent python">
    <h2>Python</h2>
    ${
        c.python.length === 0 
        ? html`<h3 class="no-articles">No articles yet</h3>`
        : c.python.map(record)
    }
</section>
</section>`