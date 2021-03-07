const container = document.getElementById('main')

container.addEventListener('click', ctaLoadInfo)

function ctaLoadInfo(e) {
    if(e.target.className !== 'btn-show'){
        return 
    }
    const btnShow = e.target
    const locked = e.target.parentElement.querySelector('input').checked
    const moreInfo = e.target.parentElement.querySelector('div')
    if(locked === false) {
        btnShow.innerHTML = btnShow.innerHTML === 'Show more' ? 'Hide it' : 'Show more'
        btnShow.innerHTML === 'Hide it' ? moreInfo.style.display = 'block' : moreInfo.style.display = 'none' 
    }
}
async function getData(url) {
    return await fetch(url)
        .then(res => res.json())
        .catch(handleErrors)
}

async function lockedProfile() {
    const data = await getData('http://localhost:3030/jsonstore/advanced/profiles')
    container.innerHTML = Object.values(data)
        .map( x => template(x)).join('')
}

function handleErrors(error) {
    throw new Error(error)
}

function template(data) {
    return `
    <div class="profile">
        <img src="./iconProfile2.png" class="userIcon" />
        <label>Lock</label>
        <input type="radio" name="${data._id}" value="lock" checked>
        <label>Unlock</label>
        <input type="radio" name="${data._id}" value="unlock"><br>
        <hr>
        <label>Username</label>
        <input type="text" name="${data.username}" value="${data.username}" disabled readonly />
        <div id="${data._id}" style="display:none">
            <hr>
            <label>Email:</label>
            <input type="email" name="${data.email}" value="${data.email}" disabled readonly />
            <label>Age:</label>
            <input type="email" name="${data.age}" value="${data.age}" disabled readonly />
        </div>
        <button class = "btn-show">Show more</button>
    </div>
`.trim()
}