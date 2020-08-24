<template>
	<div id="login">
		<b-modal v-model="showPasswordReset" :width="640" scroll="keep">
			<PasswordReset @close="togglePasswordReset()"></PasswordReset>
		</b-modal>
		<div :class="{ 'signup-form': !showLoginForm }">
			<div>
				<div class="box">
					<form v-if="showLoginForm" @submit.prevent class="column">
						<label class="label">Login</label>
						<label class="label">
							<div class="control">
								<h1 class="text" for="email1">Email</h1>
								<input
									class="input"
									v-model.trim="loginForm.email"
									type="text"
									placeholder="you@email.com"
									id="email1"
								/>
							</div>
							<div class="control">
								<h1 class="text" for="password1">Password</h1>
								<input
									class="input"
									v-model.trim="loginForm.password"
									type="password"
									placeholder="******"
									id="password1"
								/>
							</div>
						</label>

						<div class="has-text-centered">
							<b-button @click="login()" class="button is-link">Log In</b-button>
						</div>
						<hr />
						<div class="extras columns is-vcentered has-text-centered">
							<div class="column">
								<b-button @click="togglePasswordReset()">Forgot Password</b-button>
							</div>
							<div class="column">
								<a @click="toggleForm()">Create an Account</a>
							</div>
						</div>
					</form>
					<form v-else @submit.prevent class="column">
						<label class="label">Sign up</label>
						<div class="label">
							<div class="control">
								<h1 for="name">Name</h1>
								<input
									class="input"
									v-model.trim="signupForm.name"
									type="text"
									placeholder="Ventu"
									id="name"
								/>
							</div>
							<div class="control">
								<h1 for="email2">Email</h1>
								<input
									class="input"
									v-model.trim="signupForm.email"
									type="text"
									placeholder="you@email.com"
									id="email2"
								/>
							</div>
							<div class="control">
								<h1 for="password2">Password</h1>
								<input
									class="input"
									v-model.trim="signupForm.password"
									type="password"
									placeholder="min 6 characters"
									id="password2"
								/>
							</div>
						</div>
						<div class="has-text-centered">
							<b-button @click="signup()" class="button is-link">Sign Up</b-button>
						</div>
						<hr />
						<div class="extras columns is-vcentered has-text-centered">
							<div class="column">
								<b-button @click="togglePasswordReset()">Forgot Password</b-button>
							</div>
							<div class="column">
								<a @click="toggleForm()">Back to Log In</a>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import PasswordReset from '@/components/PasswordReset'

export default {
	components: {
		PasswordReset
	},
	data() {
		return {
			loginForm: {
				email: '',
				password: ''
			},
			signupForm: {
				name: '',
				admin: false,
				email: '',
				password: ''
			},
			showLoginForm: true,
			showPasswordReset: false
		}
	},
	methods: {
		toggleForm() {
			this.showLoginForm = !this.showLoginForm
		},
		togglePasswordReset() {
			this.showPasswordReset = !this.showPasswordReset
		},
		login() {
			this.$store.dispatch('login', this.loginForm)
		},
		signup() {
			this.$store.dispatch('signup', this.signupForm)
		}
	}
}
</script>
