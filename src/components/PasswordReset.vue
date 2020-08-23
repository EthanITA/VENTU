<template>
	<div class="box">
		<div v-if="!showSuccess">
			<label class="label">Enter your email to reset your password</label>
			<form @submit.prevent>
				<input class="input" v-model.trim="email" type="email" placeholder="you@email.com" />
			</form>
			<br />
			<label v-if="errorMsg !== ''" class="has-text-danger label">{{ errorMsg }}</label>
			<div class="has-text-right">
				<button @click="resetPassword()" class="button">Reset</button>
			</div>
		</div>
		<label class="label has-text-success" v-else>Success! Check your email for a reset link.</label>
	</div>
</template>

<script>
import { auth } from '@/firebase'

export default {
	data() {
		return {
			email: '',
			showSuccess: false,
			errorMsg: ''
		}
	},
	methods: {
		async resetPassword() {
			this.errorMsg = ''

			try {
				await auth.sendPasswordResetEmail(this.email)
				this.showSuccess = true
			} catch (err) {
				this.errorMsg = err.message
			}
		}
	}
}
</script>
