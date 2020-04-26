import deepmerge from 'deepmerge'

export const filterObject = (raw, notAllowed) =>
    Object.keys(raw)
        .filter((key) => !notAllowed.includes(key))
        .reduce((obj, key) => {
            obj[key] = raw[key]
            return obj
        }, {})

export const index = (obj, i) => obj[i]

export const indexValue = (obj, queries) => queries.split('.').reduce(index, obj)

export const filterWithQueryNotation = (obj, queries) => {
    let object = {}
    const result = object
    const arr = queries.split('.')
    for (let i = 0; i < arr.length - 1; i++) {
        /* eslint-disable-next-line no-multi-assign */
        object = object[arr[i]] = {}
    }

    object[arr[arr.length - 1]] = indexValue(obj, queries)

    return result
}

export const deepMerge = (obj, otherObj) =>
    deepmerge(obj, otherObj, {
        arrayMerge: (dest, src) => [...dest, ...src]
    })

export const deepMergeAll = (objs) =>
    deepmerge.all(objs, {
        arrayMerge: (dest, src) => [...dest, ...src]
    })
