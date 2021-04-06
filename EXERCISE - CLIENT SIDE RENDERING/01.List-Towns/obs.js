
function decoratorFactory(t, pH) {
    return new Proxy(t, pH)
}

export function obsObj(target) {
    const observables = []

    return decoratorFactory(target, {
        get: (t, p) => {
            if (p === 'setTemplate') {
                return (obs) => observables.push(obs)
            }
            return Reflect.get(t, p)
        },
        set: (t, p, v) => {
            observables.forEach(x => x(p, t[p], v))
            return Reflect.set(t, p, v)
        }
    })
}

export function obs(t, cb) {
    t.setTemplate(cb)
}