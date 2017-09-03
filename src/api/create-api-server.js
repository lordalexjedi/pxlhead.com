import Firebase from 'firebase'
import LRU from 'lru-cache'

export function createAPI({ config }) {
  let api
  if (process.__API__) {
    api = process.__API__
  } else {
    Firebase.initializeApp(config)
    api = process.__API__ = Firebase.database()

    api.onServer = true

    // fetched item cache
    api.cachedItems = LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15 // 15 min cache
    })

    // cache the latest story ids
    api.cachedIds = { views: {}, time: {} }
    const sorts = ['views', 'time']
    const types = ['articles', 'projects', 'experiments', 'music', 'art']

    sorts.forEach(sort => {
      const sortList = api.cachedIds[sort]
      types.forEach(type => {
        api.ref(`postIds/${type}`).orderByChild(sort).on('value', snapshot => {
          const val = []
          snapshot.forEach(childSnap => {
            val.push(childSnap.key)
          })
          sortList[type] = val.reverse()
        })
      })
    })
  }
  return api
}
