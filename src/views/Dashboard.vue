<template>
	<div class="columns is-multiline">
		<b-modal v-model="show_create_event" style="height:100vh">
			<CreateEvent
				class="is-vcentered"
				style="min-height:25vh;overflow:hidden;"
				:date="date"
				:modal="show_create_event"
				@reserved="reserved(date)"
				@close="toggleCreateEvent()"
			></CreateEvent>
		</b-modal>
		<div class="column" @click="calendarClick()">
			<b-datepicker inline v-model="date" :events="events" :min-date="min_date"></b-datepicker>
		</div>
		<div class="column has-text-centered">
			<div v-if="hasEvent()" class="box has-text-left events">
				<div class="label">Amministratori</div>
				<div class="has-text-centered" v-if="data_admin.length === 0">Non c'è nessun amministratore</div>

				<b-table v-else :data="data_admin" :columns="columns"></b-table>

				<hr />

				<div class="label">Partecipanti</div>
				<div class="has-text-centered" v-if="data_not_admin.length === 0">Non c'è nessun partecipante</div>
				<b-table v-else :data="data_not_admin" :columns="columns"></b-table>
			</div>

			<div v-else class="box" style="background-color:rgba(255,255,255,0.5)">
				<div class="is-text">Non c'è nessuno in questo giorno</div>
			</div>
			<div class="columns">
				<div class="column">
					<button class="button is-danger" @click="deleteEvent()">Toglimi</button>
				</div>
				<div class="column">
					<button class="button is-success" @click="toggleCreateEvent()">Ci sono</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CreateEvent from "@/components/CreateEvent"
import moment from "moment"
const now = new Date()
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
export default {
	components: {
		CreateEvent
	},
	data() {
		return {
			columns: [
				{
					field: 'n',
					label: 'NR.',
					width: '40',
					numeric: true
				},
				{
					field: 'name',
					label: 'Nome',
				},
				{
					field: 'time',
					label: 'Ora'
				}
			],
			data_admin: [],
			data_not_admin: [],
			show_create_event: false,
			min_date: today,
			date: today,
			eventsDays: {},
			events: [

			]
		}
	},
	methods: {
		parseTime(time) {
			return time < 10 ? '0' + time : '' + time
		},
		isAdmin() {
			return this.$store.getters.getUserProfile.admin
		},
		hasEvent() {
			return this.data_admin.length + this.data_not_admin.length > 0
		},
		fetchTodayEvents() {
			var date = moment(this.date)
			this.data_admin = []
			this.data_not_admin = []
			if (this.eventsDays[date.year() + '' + date.month() + '' + date.date()]) {
				this.$store.dispatch("fetchTodayEvents", moment(this.date)).then(() => {
					var today_events = this.$store.getters.getTodayEvents
					var n = 0

					today_events.admin.forEach(admin => {
						n += 1
						this.data_admin.push({
							n: n,
							name: admin.name,
							time: this.parseTime(admin.time.hour1) + ":" + this.parseTime(admin.time.minute1) +
								' - ' + this.parseTime(admin.time.hour2) + ":" + this.parseTime(admin.time.minute2)
						})
					})
					n = 0
					today_events.not_admin.forEach(not_admin => {
						n += 1
						this.data_not_admin.push({
							n: n,
							name: not_admin.name,
							time: this.parseTime(not_admin.time.hour1) + ":" + this.parseTime(not_admin.time.minute1) +
								' - ' + this.parseTime(not_admin.time.hour2) + ":" + this.parseTime(not_admin.time.minute2)
						})
					})
				})
			}

		},
		calendarClick() {
			this.fetchTodayEvents()
		},
		toggleCreateEvent() {
			this.show_create_event = !this.show_create_event
		},
		deleteEvent() {
			var date = moment(this.date)
			this.$store.dispatch("deleteEvent", date).then(() => {
				this.loadEventsMonth()
			})
		},
		reserved(date) {
			date = moment(date)
			this.toggleCreateEvent()
			this.addCircleEvent(date.year(), date.month(), date.date(), this.$store.getters.getUserProfile.admin)
			this.fetchTodayEvents()
		},
		addCircleEvent(year, month, day, isAdmin) {

			this.events.push({
				date: new Date(year, month, day),
				type: isAdmin ? 'is-danger' : "is-primary"
			})
			this.eventsDays[year + '' + month + '' + day] = true
		},
		loadEventsMonth() {
			this.events = []
			this.$store.dispatch("fetchEventsMonth", moment(today)).then(() => {
				var events = this.$store.getters.getEvents
				var ids = Object.keys(events)
				ids.forEach(id => {
					var days = Object.keys(events[id])
					days.forEach(day => {
						var adminArr = events[id][day].admin
						var not_adminArr = events[id][day].not_admin
						adminArr.forEach(el => {
							this.addCircleEvent(el.year, el.month, day, true)
						})
						not_adminArr.forEach(el => {

							this.addCircleEvent(el.year, el.month, day, false)
						})

					})
				})
				this.fetchTodayEvents()
			})
		}
	},
	mounted() {
		this.loadEventsMonth()
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
