import { createAPI } from 'create-api'

const logRequests = !!process.env.DEBUG_API

const api = createAPI({
  config: {
    databaseURL: 'https://pxlheadcom.firebaseio.com',
    storageBucket: 'pxlheadcom.appspot.com'
  }
})

function fetch(child, sortBy) {
  sortBy = sortBy || 'views'
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

export function fetchSearchedIds(type, tags) {
  return new Promise((resolve, reject) => {
    const ids = []
    let tagsChecked = 0
    tags.forEach(tag => {
      api.ref(`postIds/${type}`).orderByChild(`tags/${tag}`).equalTo(true)
        .once('value', snapshot => {
          snapshot.forEach(childSnap => {
            ids.push(childSnap.key)
          })
          tagsChecked++
          if (tagsChecked === tags.length) resolve(ids)
        }, reject)
    })
  })
}

export function fetchItem(id) {
  return fetch(`posts/${id}`)
}

export function fetchItems(ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchItemView({ id, type, views }) {
  views++
  return api.ref().update({
    [`/posts/${id}/views`]: views,
    [`/postIds/${type}/${id}/views`]: views
  }).then(() => fetch(`posts/${id}`))
}

export function fetchComments(ids) {
  return Promise.all(ids.map(id => fetch(`comments/${id}`, 'time')))
}

export function uploadComment(comment) {
  return new Promise((resolve, reject) => {
    if (!/^[a-zA-Z-\.\d\s]+$/i.test(comment.by)) reject

    comment.id = api.ref().child('comments').push().key
    comment.time = api.ServerValue.TIMESTAMP

    api.ref().update({
      [`/posts/${comment.postId}/commentIds/${comment.id}/time`]: comment.time,
      [`/comments/${comment.id}`]: comment
    }).then(() => {
      const cache = api.cachedItems
      comment.__lastUpdated = Date.now()
      cache && cache.set(comment.id, comment)
      resolve(comment)
    }, reject)
  })
}
