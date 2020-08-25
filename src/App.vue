<template>
	<div id="app">
		<div class="hero is-fullheight is-primary is-bold is-unselectable">
			<SiteNav class="hero-header"></SiteNav>
			<router-view class="hero-body container is-full-screen" />
		</div>
	</div>
</template>

<script>
import SiteNav from '@/components/SiteNav'

export default {
	created() {
		if (this.$workbox) {
			this.$workbox.addEventListener("waiting", () => {
				this.showUpgradeUI = true
			})
		}
	},
	methods: {
		async accept() {
			this.showUpgradeUI = false
			await this.$workbox.messageSW({ type: "SKIP_WAITING" })
		}
	},
	components: {
		SiteNav
	}
}
</script>
<style scoped>
.columns {
	margin-bottom: -0.75rem;
}
</style>