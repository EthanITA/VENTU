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
	components: {
		SiteNav
	}
}
</script>
<style scoped>
.columns:last-child {
	margin-bottom: -0.75rem;
}
</style>