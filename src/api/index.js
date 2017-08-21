import { createAPI } from 'create-api'

const logRequests = !!process.env.DEBUG_API

const api = createAPI({
  config: {
    apiKey: "AIzaSyBhrsQFpdW78i25ykELO_8HBzgulaqOpI8",
    databaseURL: "https://pxlheadcom.firebaseio.com",
    projectId: "pxlheadcom",
    storageBucket: "pxlheadcom.appspot.com",
  }
})

function fetch (child) {
  logRequests && console.log(`fetching ${child}...`)
  const cache = api.cachedItems
  if (cache && cache.has(child)) {
    logRequests && console.log(`cache hit for ${child}.`)
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise((resolve, reject) => {
      api.child(child).once('value', snapshot => {
        const val = snapshot.val()
        // mark the timestamp when this item is cached
        if (val) val.__lastUpdated = Date.now()
        cache && cache.set(child, val)
        logRequests && console.log(`fetched ${child}.`)
        resolve(val)
      }, reject)
    })
  }
}

export function fetchIdsByType (type) {
  return api.cachedIds && api.cachedIds[type]
    ? Promise.resolve(api.cachedIds[type])
    : fetch(`postIds/${type}`)
}

export function fetchItem (id) {
  return fetch(`posts/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchComments (ids) {
  return Promise.all(ids.map(id => fetch(`comments/${id}`)))
}

export function watchList (type, cb) {
  let first = true
  const ref = api.child(`postIds/${type}`)
  const handler = snapshot => {
    if (first) {
      first = false
    } else {
      cb(snapshot.val())
    }
  }
  ref.on('value', handler)
  return () => {
    ref.off('value', handler)
  }
}
