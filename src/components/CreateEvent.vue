<template>
	<div class="has-text-centered columns is-centered">
		<div class="box">
			<div class="label">{{name}}</div>
		</div>
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

<style scoped>
.columns {
	margin: 0;
}
</style>
