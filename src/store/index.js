import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import * as fb from '../firebase'

Vue.use(Vuex)

// realtime firebase
fb.eventsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let postsArray = []

  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id

    postsArray.push(post)
  })

  store.commit('setPosts', postsArray)
})


function code_date(date) {
  return date.year() + '' + date.month()
}







const store = new Vuex.Store({
  state: {
    userProfile: {}, //userProfile.name, userProfile.admin
    events: {},
    posts: [],
    todayEvents: []
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setPerformingRequest(state, val) {
      state.performingRequest = val
    },
    setPosts(state, val) {
      state.posts = val
    },
    setEvents(state, val) {
      state.events = val
    },
    setTodayEvents(state, val) {
      state.todayEvents = val
    }
  },
  getters: {
    getUserProfile(state) {
      return state.userProfile
    },
    getEvents(state) {
      return state.events
    },
    getTodayEvents(state) {
      return state.todayEvents
    }
  },
  actions: {
    async fetchTodayEvents({ commit }, date) {
      // date is a moment() object
      var coded_date = code_date(date)
      var doc = await fb.eventsCollection.doc(coded_date).get().catch((err) => { alert(err.message) })
      commit("setTodayEvents", doc.data()[date.date()])
    },
    async login({ dispatch }, form) {
      // Try to login 
      await fb.auth.signInWithEmailAndPassword(form.email, form.password).catch(error => { alert(error.message) })
      if (fb.auth.currentUser) {

        // fetch user profile and set in state if logged in
        dispatch('fetchUserProfile')
      }
    },
    async signup({ dispatch }, form) {

      // Try to signup with email and password on Firebase
      await fb.auth.createUserWithEmailAndPassword(form.email, form.password).catch(error => { alert(error.message) })

      // Check if i'm logged in
      if (fb.auth.currentUser) {
        // create a document 
        await fb.usersCollection.doc(fb.auth.currentUser.email).set({
          name: form.name,
          admin: form.admin
        })
        // fetch user profile and set in state
        dispatch('fetchUserProfile')
      }
    },
    async fetchUserProfile({ commit }) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(fb.auth.currentUser.email).get().catch(err => { alert(err.message) })
      // set user profile in state
      commit('setUserProfile', userProfile.data())

      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },
    async logout({ commit }) {
      // log user out
      await fb.auth.signOut()

      // clear user data from state
      commit('setUserProfile', {})

      // redirect to login view
      if (router.currentRoute.path !== '/login') {
        router.push('/login')
      }
    },
    async fetchEventsMonth({ commit }, date) {
      var coded_date = code_date(date)
      var events = {}
      var coll = await fb.eventsCollection.get()
      coll.docs.forEach(doc => {
        if (parseInt(doc.id) >= parseInt(coded_date)) {
          events[doc.id] = doc.data()
        }
      })

      commit("setEvents", events)
    },
    async deleteEvent({ commit }, date) {
      var doc = await fb.eventsCollection.doc(code_date(date)).get().catch((err) => { alert(err.message) })
      if (doc.data()) {
        var isAdminKey = this.getters.getUserProfile.admin ? "admin" : "not_admin"
        var new_reservations = []
        doc.data()[date.date()][isAdminKey].forEach((event) => {
          if (fb.auth.currentUser.email !== event.email) {
            new_reservations.push(event)
          }
        })
        await fb.eventsCollection.doc(code_date(date)).update(
          { [date.date() + '.' + isAdminKey]: new_reservations })
          .catch((err) => { alert(err.message) })
      }
    },
    async createEvent({ commit }, event) {
      // ex. 2020521 = 21 may 2020
      var coded_date = code_date(event.date)
      // fetch date from Firestore
      var doc = await
        fb.eventsCollection.doc(coded_date).get().
          catch((err) => alert(err.message))
      var new_reservation

      var isAdmin = this.getters.getUserProfile.admin
      var keyIsAdmin = isAdmin ? "admin" : "not_admin"

      new_reservation = {
        year: event.date.year(),
        month: event.date.month(),
        time: event.time,
        name: this.getters.getUserProfile.name,
        email: fb.auth.currentUser.email
      }

      // check if coded_date is already saved on Firestore
      if (!doc.data() || !doc.data()[event.date.date()]) {

        var new_obj = {
          [event.date.date()]:
          {
            [keyIsAdmin]: [new_reservation],
            [!isAdmin ? "admin" : "not_admin"]: []
          }
        }
        // create doc
        await fb.eventsCollection.doc(coded_date).update(new_obj)
          .catch(() => {
            fb.eventsCollection.doc(coded_date).set(new_obj)
              .catch((e) => { alert(e.message) })
          })
      }
      else {
        var posted = false
        var reservations = doc.data()[event.date.date()][keyIsAdmin]
        for (let i = 0; i < reservations.length; i++) {
          if (reservations[i].email === fb.auth.currentUser.email) {
            posted = true
          }
        }
        if (!posted) {
          if (!reservations[0]) {
            reservations = [new_reservation]
          }
          else {
            reservations.push(new_reservation)
          }
          await fb.eventsCollection.doc(coded_date).update({ [event.date.date() + "." + keyIsAdmin]: reservations })
        }
      }
    },











    async likePost({ commit }, post) {
      const userId = commit("getUserProfile")
      const docId = `${userId}_${post.id}`

      // check if user has liked post
      const doc = await fb.likesCollection.doc(docId).get()
      if (doc.exists) { return }

      // create post
      await fb.likesCollection.doc(docId).set({
        postId: post.id,
        userId: userId
      })

      // update post likes count
      fb.eventsCollection.doc(post.id).update({
        likes: post.likesCount + 1
      })

    }
  }
})

export default store
