const baseUrl = 'http://localhost:3030/jsonstore/blog'

const routes = {
    'posts': '/posts',
    'comments': '/comments'
}
const posts = document.getElementById('posts')

function attachEvents() {
    let postData

    document.getElementById('btnLoadPosts').addEventListener('click', loadPosts)
    document.getElementById('btnViewPost').addEventListener('click', e => renderData(e, postData))

    async function loadPosts() {
        const data = await getData(baseUrl, routes['posts'])
        posts.innerHTML = Object.values(data)
            .map( v => `<option value='${v.id}'>${v.title}</option>`)
            .join('')
        postData = data
    }
    async function renderData(e, postData) {
        const post = e.target.previousElementSibling
        if(post.value === '') { return }
        const data = await getData(baseUrl, routes['comments'])

        const foundPost = Object.values(postData).filter( x => x.id === post.value)

        document.getElementById('post-title').innerHTML = foundPost[0].title
        document.getElementById('post-body').innerHTML = foundPost[0].body
        
        const foundComments = Object.values(data).filter( x => x.postId === post.value)

        document.getElementById('post-comments').innerHTML = foundComments.map( x => `<li>${x.text}</li>` ).join('')
    }
}

attachEvents()

async function getData(url, path) {
    return await fetch(url + path)
        .then(res => res.json())
        .catch(errorHandler)
}

function errorHandler(error) {
    throw new Error(error)
}
