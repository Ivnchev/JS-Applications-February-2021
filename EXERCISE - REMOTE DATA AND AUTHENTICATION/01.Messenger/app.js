const main = {
    baseUrl: 'http://localhost:3030/jsonstore/messenger',
    messages: () => document.getElementById('messages'),
    refresh: () => document.getElementById('refresh'),
    author: () => document.getElementById('author'),
    content: () => document.getElementById('content'),
    submit: () => document.getElementById('submit'),
    refreshData,
    postComment,
    validateData,
}
main['refresh']().addEventListener('click', () => main['refreshData']() )
main['submit']().addEventListener('click', () => main['postComment']() )

const errorhandler = (error) => { throw new Error(error) }
const clearInputs = () => { [ main['author'](), main['content']() ].map(x => x.value = '') }
async function refreshData() {
    const data = await getData(this.baseUrl)
    this.messages().value = Object.values(data)
        .map(x => `${x.author}: ${x.content}`).join('\n')
}
async function postComment() {
    const data = this.validateData(this.author(),this.content())  
    fetch(this.baseUrl, {method: 'POST', body: JSON.stringify(data)})
        .then(clearInputs)
        // .then(this.refreshData())
        .catch(errorhandler)
}
function validateData(author, content) {
    if(author.value === '' || content.value === ''){
        const message = 'Incorrect Data! Please insert correct Name or Message!'
        alert(message)
        errorhandler(message)
    }
    const data = {
        author: this.author().value,
        content: this.content().value
    }
    return data
}
async function getData(url) {
    return await fetch(url)
        .then(res => res.json())
        .catch(errorhandler)
}

