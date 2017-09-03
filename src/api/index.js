import { createAPI } from 'create-api'

const logRequests = !!process.env.DEBUG_API

const api = createAPI({
  config: {
    databaseURL: 'https://pxlheadcom.firebaseio.com',
    storageBucket: 'pxlheadcom.appspot.com'
  }
})

function fetch(child, sortBy) {
  logRequests && console.log(`fetching ${child}...`)
  const cache = api.cachedItems
  if (cache && cache.has(child)) {
    logRequests && console.log(`cache hit for ${child}.`)
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise((resolve, reject) => {
      api.ref(child).orderByChild(sortBy).once('value', snapshot => {
        let val = []
        if (child.includes('postIds')) {
          snapshot.forEach(childSnap => {
            val.push(childSnap.key)
          })
          val.reverse()
        } else {
          val = snapshot.val()
        }
        // mark the timestamp when this item is cached
        if (val) val.__lastUpdated = Date.now()
        cache && cache.set(child, val)
        logRequests && console.log(`fetched ${child}.`)
        resolve(val)
      }, reject)
    })
  }
}

export function fetchIdsByType(type, sortBy) {
  const cachedIds = api.cachedIds ? api.cachedIds[sortBy] : api.cachedIds
  return cachedIds && cachedIds[type]
    ? Promise.resolve(cachedIds[type])
    : fetch(`postIds/${type}`, sortBy)
}

export function fetchItem(id) {
  return fetch(`posts/${id}`, 'views')
}

export function fetchItems(ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchComments(ids) {
  return Promise.all(ids.map(id => fetch(`comments/${id}`)))
}
