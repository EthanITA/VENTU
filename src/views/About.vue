<template>
	<div>
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
		<div class="columns multiline container is-link list_profile">
			<div
				:class="{ 'column is-one-quarter': profile }"
				v-for="profile in Object.keys(infos)"
				:key="profile"
			>
				<div @click="card(profile)" v-if="profile" class="columns is-multiline box">
					<div class="column image is-full">
						<img class="is-rounded" :src="infos[profile].img" :alt="infos[profile].img" />
					</div>

					<label class="column has-text-centered label">{{infos[profile].name}}</label>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.list_profile > *:last-child {
	margin-bottom: 12px;
}
div.columns {
	margin-left: 1px;
	margin-right: 1px;
}
div.box:hover,
div.box:focus {
	background-color: rgba(255, 255, 255, 0.4);
}
div.box {
	background: rgba(255, 255, 255, 0.2);
}
</style>

<script>
import dongImg from "../images/dong.jpg"
import ventuImg from "../images/ventu.jpg"
import ottoImg from "../images/otto.jpg"
import castaImg from "../images/casta.jpg"
export default {

	data() {
		return {
			infos: {
				ventu: {
					name: "Luca Venturini", update: "Aug 2020", img: ventuImg,
					content: `
						Il boss della palestra!
						`,
					contacts: `
						Email: <a target="_blank" href="mailto:lucaventur167.lv@gmail.com">lucaventur167.lv@gmail.com</a> <br>
						Cell: 349 326 8691
						`},
				otto: {
					name: "Riccardo Ottonello", update: "Aug 2020", img: ottoImg,
					content: `
						Il boss della palestra!
					`,
					contacts: `
						Cell: -
						`},
				casta: {
					name: "Stefano Castagna", update: "Aug 2020", img: castaImg,
					content: `
						Il boss della palestra!
						`,
					contacts: `
						Cell: 346 732 8290
						`
				},
				dong: {
					name: "Marco Dong", update: "Aug 2020", img: dongImg,
					content: `
						Sviluppatore del sito!
						`,
					contacts: `
						Email: <a target="_blank" href="mailto:viaimperiale@gmail.com">viaimperiale@gmail.com</a> <br>
						Telegram: <a target="_blank" href="https://t.me/Marcod98">@Marcod98</a> <br>
						Cell: 366 400 5624
						`},
				"": {},
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