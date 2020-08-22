<template>
	<b-navbar class="is-dark">
		<template slot="brand">
			<b-navbar-item tag="router-link" :to="{ path: '/' }">
				<label class="title">VENTU</label>
			</b-navbar-item>
		</template>
		<template slot="start">
			<b-navbar-item href="/about">About</b-navbar-item>
		</template>

		<template slot="end">
			<b-navbar-item tag="div">
				<a class="button" @click="logout()">Log out</a>
			</b-navbar-item>
		</template>
	</b-navbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
	methods: {
		logout() {
			this.$store.dispatch('logout')
		}
	},
	computed: {
		...mapState(['userProfile']),
		showNav() {
			return Object.keys(this.userProfile).length > 1
		}
	}
}
</script>
