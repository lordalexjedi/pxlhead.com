import Firebase from 'firebase/app'
import 'firebase/database'

export function createAPI({ config }) {
  Firebase.initializeApp(config)
  const db = Firebase.database()
  db.ServerValue = Firebase.database.ServerValue
  return db
}
