<template>
	<div class="columns is-centered">
		<div class="box column is-half">
			<div class="label">
				{{
				date.toLocaleString("default", {weekday:"long"}) + " " +
				date.getDate() + " - " +
				date.toLocaleString("default", {month:"long"})
				}}
			</div>
			<div class="columns has-text-centered is-vcentered">
				<div class="column">Ci sono dalle ore:</div>
				<div class="column is-light">
					<b-timepicker v-model="time_start" rounded editable hour-format="24"></b-timepicker>
				</div>-
				<div class="column is-light">
					<b-timepicker v-model="time_end" rounded editable hour-format="24"></b-timepicker>
				</div>
			</div>
			<div class="has-text-right">
				<div class="button is-primary" @click="reserve()">Prenota</div>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment'
export default {
	props: ["date", "modal"],
	data() {
		return {
			time_start: new Date(),
			time_end: new Date(),
			time: new Date()
		}
	},
	methods: {
		reserve() {
			var h1 = moment(this.time_start).hour()
			var h2 = moment(this.time_end).hour()
			var m1 = moment(this.time_start).minute()
			var m2 = moment(this.time_end).minute()
			this.$store.dispatch('createEvent', { time: { hour1: h1, minute1: m1, hour2: h2, minute2: m2 }, date: moment(this.date) }).then(() => {
				this.$emit('reserved', this.date)
			}).catch((e) => {
				alert(e.message)
			})
		}
	}
}
</script>

<style scoped>
.columns {
	margin: 0;
}
</style>
