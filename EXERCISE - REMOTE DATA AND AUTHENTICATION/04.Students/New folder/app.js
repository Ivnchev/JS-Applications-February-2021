import { get, post } from './requester.js';
load();

document.getElementById('submit')
    .addEventListener('click', postStudent)

function load() {
    get('students')
        .then(renderHTML);
}

function renderHTML(data) {
    fetch('./studentTemplate.hbs')
        .then(info => { return info.text() })
        .then(template => {
            data = Object.values(data);
            data = data.sort((a, b) => Number(a.id) - Number(b.id));
            const compiled = Handlebars.compile(template);
            document.getElementById('tbody').innerHTML = compiled({ data });
        });
}

function postStudent(ev) {
    ev.preventDefault();
    const inputFields = Array.from(document.getElementById('form'))
        .filter(e => { return e.tagName === 'INPUT' });

    const body = createBody(inputFields);

    if (body !== -1) {
        post('students', body)
            .then(load)
            .then(inputFields.forEach(el => el.value = ''))
    }
}

function createBody(inputFields) {
    let body = {};
    const numbers = ['id', 'facultyNumber', 'grade'];
    const strings = ['firstName', 'lastName'];

    for (const input of inputFields) {

        if (strings.includes(input.id)) {
            if (input.value !== '') {
                body[input.id] = input.value;
            } else {
                alert(`${input.id} should be a String!`);
                return -1;
            }
        }
        if (numbers.includes(input.id)) {
            if (input.value !== '' && !isNaN(input.value)) {
                body[input.id] = input.value;
            } else {
                alert(`${input.id} should be a Number!`);
                return -1;
            }
        }
    }
    return body;
}