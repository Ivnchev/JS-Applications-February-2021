const { chromium } = require('playwright-chromium')
const { assert } = require('chai')

let browser, page;

function json(data) {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
}

describe('e2e tests', function () {
    this.timeout(60000)
    before(async () => { browser = await chromium.launch({ headless: false, slowMo: 500 }) })
    // before(async () => { browser = await chromium.launch() })
    after(async () => { browser.close() })
    beforeEach(async () => { page = await browser.newPage() })
    afterEach(async () => { await page.close() })

    it('test Load', async function () {
        await page.route('**/jsonstore/collections/books',
            r => r.fulfill(json({
                '01': { "author": "J.K.Rowling", "title": "Harry Potter and the Philosopher's Stone" },
                '02': { "author": "Svetlin Nakov", "title": "C# Fundamentals" }
            })))
        await page.goto('http://localhost:3000')
        const x = await Promise.all([
            page.waitForResponse('**/jsonstore/collections/books'),
            page.click('button[id="loadBooks"]'),
        ])
        await page.waitForTimeout(100)
        const data = await x[0].json()
        const b = await page.textContent('tbody')
        const f = b.split('').filter(x => x != ' ').join('')
        //test the view data
        assert.equal(f.split('\n').join(''), `HarryPotterandthePhilosopher'sStoneJ.K.RowlingEditDeleteC#FundamentalsSvetlinNakovEditDelete`)
        //test the request data
        assert.equal(JSON.stringify(data), '{"01":{"author":"J.K.Rowling","title":"Harry Potter and the Philosopher\'s Stone"},"02":{"author":"Svetlin Nakov","title":"C# Fundamentals"}}')
    })

    it('test addBook', async function () {
        await page.route('**/jsonstore/collections/books',
            r => r.fulfill(json({
                '03': { "author": "J.K.Rowlingche", "title": "Harry Potter" }
            })))
        const author = 'J.K.Rowlingche'
        const title = 'Harry Potter'

        await page.goto('http://localhost:3000')
        await page.fill('input[name="title"]', title)
        await page.fill('input[name="author"]', author)

        const x = await Promise.all([
            page.click('text="Submit"'),
            page.waitForRequest(r => r.url().includes('/jsonstore/collections/books') && r.method() === 'POST'),
        ])
        assert.equal(x[1].postData(), '{"title":"Harry Potter","author":"J.K.Rowlingche"}')
    })

    it('test editBook', async function () {
        await page.route('**/jsonstore/collections/books',
            r => r.fulfill(json({
                '03': { "author": "J.K.Rowlingche", "title": "Harry Potter" }
            })))

        const author = 'J.K.Rowlingcheto'
        const title = 'Harry Pottercheto'
        await page.goto('http://localhost:3000')
        await page.click('button[id="loadBooks"]')
        await page.click('button[class="editBtn"]')

        await page.fill('form[id="editForm"] input[name="title"]', title)
        await page.fill('form[id="editForm"] input[name="author"]', author)

        const x = await Promise.all([
            page.click('text="Save"'),
            page.waitForRequest(r => r.url().includes('/jsonstore/collections/books') && r.method() === 'PUT'),
        ])
        assert.equal(x[1].postData(), '{"title":"Harry Pottercheto","author":"J.K.Rowlingcheto"}')

    })

    it('test delete', async function () {
        await page.route('**/jsonstore/collections/books',
            r => r.fulfill(json({
                '03': { "author": "J.K.Rowlingche", "title": "Harry Potter" }
            })))
        await page.goto('http://localhost:3000')
        await page.click('button[id="loadBooks"]')
        page.on('dialog', a => a.accept())

        const x = await Promise.all([
            page.waitForRequest(r => r.url().includes('/books/03') && r.method() === 'DELETE'),
            page.click('button[class="deleteBtn"]'),
        ])
        page.waitForTimeout(100)
 
        assert.equal(x[0].method(), 'DELETE')
        assert.equal(x[0].url(), 'http://localhost:3030/jsonstore/collections/books/03')
    })
})