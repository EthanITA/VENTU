<template>
	<div class="columns is-multiline">
		<b-modal v-model="show_create_event">
			<CreateEvent @close="toggleCreateEvent()"></CreateEvent>
		</b-modal>
		<div class="column" @click="calendarClick()">
			<b-datepicker inline v-model="date" :events="events" :min-date="min_date"></b-datepicker>
		</div>
		<div class="column has-text-centered">
			<div v-if="hasEvent()" class="box events">
				<div>AMMINISTRATORI</div>
				<div>AMMINISTRATORI</div>
				<div>AMMINISTRATORI</div>
				<hr />
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
				<div>PARTECIPANTI</div>
			</div>

			<div v-else class="box is-selectable" @click="toggleCreateEvent()">
				<div class="is-text">Non c'è nessuno in questo giorno</div>
				<br />
				<div class="icon">
					<div class="fa fa-plus"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CreateEvent from "@/components/CreateEvent"
const now = new Date()
export default {
	components: {
		CreateEvent
	},
	data() {
		return {
			show_create_event: false,
			min_date: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
			old_date: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
			date: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
			events: [
				new Date(new Date().getFullYear(), now.getMonth(), 2),
				new Date(new Date().getFullYear(), now.getMonth(), 6),
				{
					date: new Date(new Date().getFullYear(), now.getMonth(), 6),
					type: 'is-info'
				},
				{
					date: new Date(new Date().getFullYear(), now.getMonth(), 8),
					type: 'is-danger'
				},
				{
					date: new Date(new Date().getFullYear(), now.getMonth(), 10),
					type: 'is-success'
				},
				{
					date: new Date(new Date().getFullYear(), now.getMonth(), 10),
					type: 'is-link'
				},
				new Date(new Date().getFullYear(), now.getMonth(), 12),
				{
					date: new Date(new Date().getFullYear(), now.getMonth(), 12),
					type: 'is-warning'
				},
				{
					date: new Date(new Date().getFullYear(), now.getMonth(), 16),
					type: 'is-danger'
				},
				new Date(new Date().getFullYear(), now.getMonth(), 20),
				{
					date: new Date(new Date().getFullYear(), now.getMonth(), 29),
					type: 'is-success'
				},
				{
					date: new Date(new Date().getFullYear(), now.getMonth(), 29),
					type: 'is-warning'
				},
				{
					date: new Date(new Date().getFullYear(), now.getMonth(), 29),
					type: 'is-info'
				}
			]
		}
	},
	methods: {
		isAdmin() {
			return this.$store.getters.getUserProfile.admin
		},
		hasEvent() {
			return false
		},
		calendarClick() {
			if (this.old_date.toLocaleString() !== this.date.toLocaleString()) {
				this.old_date = this.date
				// fetchEvents()
			}
		},
		toggleCreateEvent() {
			this.show_create_event = !this.show_create_event
		}
	}
}
</script>
<style scoped>
div.is-selectable:hover,
div.is-selectable:focus {
	background-color: rgba(255, 255, 255, 0.4);
}
div.is-selectable {
	background-color: rgba(255, 255, 255, 0.8);
}
div.events {
	max-height: 60vh;
	overflow: auto;
}
</style>
