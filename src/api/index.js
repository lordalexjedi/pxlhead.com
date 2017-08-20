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
      let val
      if (child.includes('/')) {
        // get item
        api.child(child)
          .once('value', snapshot => {
            val = snapshot.val()
          }, reject)
      } else {
        // get array of item ids sorted by views
        api.child(child).orderByChild('views')
          .once('value', snapshot => {
            val = snapshot.val()
              ? Object.keys(snapshot.val()).reverse()
              : []
          }, reject)
      }
      if (val) val.__lastUpdated = Date.now()
      cache && cache.set(child, val)
      logRequests && console.log(`fetched ${child}.`)
      resolve(val)
    })
  }
}

export function fetchIdsByType (type) {
  return api.cachedIds && api.cachedIds[type]
    ? Promise.resolve(api.cachedIds[type])
    : fetch(type)
}

export function fetchItem (type, id) {
  return fetch(`${type}/${id}`)
}

export function fetchItems (type, ids) {
  return Promise.all(ids.map(id => fetchItem(type, id)))
}

export function watchList (type, cb) {
  let first = true
  const ref = api.child(type)
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
