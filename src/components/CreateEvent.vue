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
					<b-timepicker v-model="time" rounded editable hour-format="24"></b-timepicker>
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
			time: new Date()
		}
	},
	methods: {
		reserve() {
			var h = moment(this.time).hour()
			var m = (moment(this.time).minute())
			this.$store.dispatch('createEvent', { time: { hour: h, minute: m }, date: moment(this.date) }).then(() => {
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
