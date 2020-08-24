import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

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










const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: []
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
    }
  },
  getters: {
    getUserProfile(state) {
      return state.userProfile
    }
  },
  actions: {
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
