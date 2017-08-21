import Firebase from 'firebase'
import LRU from 'lru-cache'

export function createAPI ({ config }) {
  let api
  if (process.__API__) {
    api = process.__API__
  } else {
    Firebase.initializeApp(config)
    api = process.__API__ = Firebase.database().ref()

    api.onServer = true

    // fetched item cache
    api.cachedItems = LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15 // 15 min cache
    })

    // cache the latest story ids
    api.cachedIds = {}
    ;['articles', 'projects', 'experiments', 'music', 'art'].forEach(type => {
      api.child(`postIds/${type}`).on('value', snapshot => {
        api.cachedIds[type] = snapshot.val()
      })
    })
  }
  return api
}
