import { html } from "../../node_modules/lit-html/lit-html.js";
import { t as team } from "./common/team.js";

export const t = (teams, user) => html`<section id="browse">


<article class="pad-med">
    ${
    user
        ? html`<h1>My Teams</h1>`
        : html`<h1>Team Browser</h1>`
    }
</article>

<article class="layout narrow">
    ${
    teams.length === 0
    ? html`<div class="pad-med">
        <p>You are not a member of any team yet.</p>
        <p><a href="/browse">Browse all teams</a> to join one, or use the button bellow to cerate your own team.</p>
        </div>` : ''
    }
    ${
        user
        ? html`<div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>`
        : ''
    }
    
</article>

${teams.map(team)}

</section>`