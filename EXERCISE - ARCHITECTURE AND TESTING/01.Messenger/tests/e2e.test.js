const { chromium } = require('playwright-chromium')
const { assert } = require('chai')

let browser, page;

function json(data) {
    return {
        status:200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    }
}

describe('e2e tests', function () {
    this.timeout(6000)
    before(async () => { browser = await chromium.launch({ headless: false, slowMo: 500 }) })
    // before(async () => { browser = await chromium.launch() })
    after(async () => { browser.close() })
    beforeEach(async () => { page = await browser.newPage() })
    afterEach(async () => { await page.close() })

    it('Test load messages', async () => {
        await page.route("**/jsonstore/messenger", (route) => route.fulfill(json({
            "_128374uashewq": { "author": "asd", "content": "asd" }
        })))
        await page.goto('http://localhost:3000')
        await page.click('text="Refresh"')

        const e = `asd: asd`
        const data = await page.$eval('textarea[id="messages"]', e => e.value)
        await page.waitForTimeout(100)

        assert.equal(data, e)
    })
    it('Test send message', async () => {
        await page.route('**/jsonstore/messenger', r => r.fulfill(json({ author: 'asd', content: 'asd' })))
        const author = 'asd'
        const content = 'asd'

        await page.goto('http://localhost:3000')
        await page.fill('input[id="author"]', author)
        await page.fill('input[id="content"]', content)
        
        const x = await Promise.all([
            page.click('text="Send"'),
            page.waitForRequest(r => r.url().includes('/jsonstore/messenger') && r.method() === 'POST'),  
        ])

        assert.equal(x[1].postData(), '{"author":"asd","content":"asd"}')
    })

})

