<template>
	<div>
		<div class="columns multiline container is-link list_profile">
			<div
				:class="{ 'column is-one-quarter': profile }"
				v-for="profile in Object.keys(infos)"
				:key="profile"
			>
				<a
					@click="card(profile)"
					v-if="profile"
					class="columns is-multiline box"
					style="background:rgba(255,255,255,0.25);"
				>
					<div class="column image is-full">
						<img class="is-rounded" :src="infos[profile].img" :alt="infos[profile].img" />
					</div>

					<label class="column has-text-centered label">{{infos[profile].name}}</label>
				</a>
			</div>
		</div>
		<b-modal v-model="isCardShown" :width="640" scroll="keep">
			<div class="card">
				<div class="card-image">
					<figure class="image is-4by3">
						<img :src="getImg()" :alt="getImg()" />
					</figure>
				</div>
				<div class="card-content">
					<div class="media-content">
						<p class="title is-4" style="color:black;">{{getName()}}</p>
					</div>

					<div class="content">
						<div class="subtitle is-6" style="color:black;" v-html="getContent()" />
						<div v-html="getContacts()"></div>
						<small>
							<div class="has-text-right">{{getUpdate()}}</div>
						</small>
					</div>
				</div>
			</div>
		</b-modal>
	</div>
</template>

<style scoped>
.list_profile > *:last-child {
	margin-bottom: 12px;
}
a.columns {
	margin-left: 1px;
	margin-right: 1px;
}
a.box:hover,
a.box:focus {
	zoom: 1.1;
}
</style>

<script>
import dongImg from "../images/dong.jpg"
import ventuImg from "../images/ventu.jpg"
import ottoImg from "../images/otto.jpg"
export default {

	data() {
		return {
			infos: {
				"": {},
				dong: {
					name: "Marco Dong", update: "Aug 2020", img: dongImg,
					content: `Sviluppatore del sito!`,
					contacts: `
						Email: <a target="_blank" href="mailto:viaimperiale@gmail.com">viaimperiale@gmail.com</a> <br>
						Telegram: <a target="_blank" href="https://t.me/Marcod98">@Marcod98</a> <br>
						Cell: 366 400 5624`},
				ventu: {
					name: "Luca Venturini", update: "Aug 2020", img: ventuImg,
					content: `Il boss della palestra! <br />`,
					contacts: `
						Email: <a target="_blank" href="mailto:lucaventur167.lv@gmail.com">lucaventur167.lv@gmail.com</a> <br>
						Cell: 349 326 8691`},
				otto: {
					name: "Riccardo Ottonello", update: "Aug 2020", img: ottoImg,
					content: `Il boss della palestra!`,
					contacts: `
						Cell: -`},
				jason: {
					name: "Jason", update: "Aug 2020", img: ventuImg,
					content: `
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Phasellus nec iaculis mauris.
						<a>@bulmaio</a>.
						<a>#css</a>
						<a>#responsive</a>
						<br />`}
			},
			isCardShown: false,
			profile: ""
		}
	},
	methods: {
		getContent() {
			return this.infos[this.profile].content
		},
		getName() {
			return this.infos[this.profile].name
		},
		getUpdate() {
			return this.infos[this.profile].update
		},
		getImg() {
			return this.infos[this.profile].img
		},
		getContacts() {
			return this.infos[this.profile].contacts
		},
		card(profile) {
			this.isCardShown = true
			this.profile = profile
		}
	}
}
</script>