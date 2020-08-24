<template>
	<div class="columns is-multiline">
		<div class="column">
			<b-datepicker inline v-model="date" :events="events"></b-datepicker>
		</div>
		<div class="column" @click="p()">
			<div v-if="isEvent()" class="box"></div>
			<div v-else class="box has-text-centered is-selectable">
				<div class="icon">
					<i class="fas fa-plus"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const thisMonth = new Date().getMonth()
export default {
	data() {
		return {
			date: new Date(new Date().getFullYear(), thisMonth, 10),
			events: [
				new Date(new Date().getFullYear(), thisMonth, 2),
				new Date(new Date().getFullYear(), thisMonth, 6),
				{
					date: new Date(new Date().getFullYear(), thisMonth, 6),
					type: 'is-info'
				},
				{
					date: new Date(new Date().getFullYear(), thisMonth, 8),
					type: 'is-danger'
				},
				{
					date: new Date(new Date().getFullYear(), thisMonth, 10),
					type: 'is-success'
				},
				{
					date: new Date(new Date().getFullYear(), thisMonth, 10),
					type: 'is-link'
				},
				new Date(new Date().getFullYear(), thisMonth, 12),
				{
					date: new Date(new Date().getFullYear(), thisMonth, 12),
					type: 'is-warning'
				},
				{
					date: new Date(new Date().getFullYear(), thisMonth, 16),
					type: 'is-danger'
				},
				new Date(new Date().getFullYear(), thisMonth, 20),
				{
					date: new Date(new Date().getFullYear(), thisMonth, 29),
					type: 'is-success'
				},
				{
					date: new Date(new Date().getFullYear(), thisMonth, 29),
					type: 'is-warning'
				},
				{
					date: new Date(new Date().getFullYear(), thisMonth, 29),
					type: 'is-info'
				}
			]
		}
	},
	methods: {
		isEvent() {
			return false
		}
	}
}
</script>
<style scoped>
div.is-selectable:hover,
div.is-selectable:focus {
	background-color: rgba(255, 255, 255, 0.5);
}
</style>
