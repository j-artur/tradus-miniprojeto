<template>
	<Navbar />
	<router-view />
</template>

<script lang="ts">
import Navbar from '@/components/Navbar.vue'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'App',
	components: {
		Navbar,
	},
})
</script>

<style lang="scss">
*,
*::before,
*::after {
	margin: 0;
	padding: 0;
	box-sizing: border-box;

	color: inherit;
}

#app {
	min-height: 100vh;

	color: var(--text-dark);

	font-family: Roboto, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

ul li {
	list-style: none;
}

a {
	color: var(--primary-green);
	text-decoration: none;
}
</style>
