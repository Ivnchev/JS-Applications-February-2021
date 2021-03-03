function solve() {
    const info = document.querySelector('#info > span')
    const departBtn = document.getElementById('depart')
    const arriveBtn = document.getElementById('arrive')
    
    let busInfo = { next : 'depot'}

    async function depart() {
        const data = await getData(busInfo.next)
        info.innerHTML = `Next stop ${data.name}`
        busInfo = data
        switchBtns(departBtn, arriveBtn)
    }

    function arrive() {
        info.innerHTML = `Arriving at ${busInfo.name}`
        switchBtns(departBtn, arriveBtn)
    }

    return {
        depart,
        arrive
    };
}

async function getData(busStop) {
    return await fetch(`http://localhost:3030/jsonstore/bus/schedule/${busStop}`)
        .then(res => res.json())
        .catch(handleError)
}

function handleError(e) {
    switchBtns(departBtn, arriveBtn, e)
    info.innerHTML = `Error`
    throw new Error(e)
}

function switchBtns(departBtn, arriveBtn, error) {
    if (error) {
        departBtn.disabled = true
        arriveBtn.disabled = true
        return
    }
    if (departBtn.disabled) {
        departBtn.disabled = false
        arriveBtn.disabled = true
        return
    }
    departBtn.disabled = true
    arriveBtn.disabled = false
}

let result = solve();