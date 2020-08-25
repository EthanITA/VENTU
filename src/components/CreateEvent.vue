<template>
	<div class="box">
		<div class="label">{{name}}</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			name: this.$store.getters.getUserProfile.name
		}
	}
}
</script>
