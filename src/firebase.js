import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init
const firebaseConfig = {
  apiKey: "AIzaSyCbe6A-q1isWENHUBfdK5vKzx0P8xObtyI",
  authDomain: "ventu-35312.firebaseapp.com",
  databaseURL: "https://ventu-35312.firebaseio.com",
  projectId: "ventu-35312",
  storageBucket: "ventu-35312.appspot.com",
  messagingSenderId: "575457078377",
  appId: "1:575457078377:web:76feb11bd9ca8e4b8a86f8",
  measurementId: "G-LZ8T6GRCLR"
}

firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const eventsCollection = db.collection('events')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  eventsCollection,
  commentsCollection,
  likesCollection
}
