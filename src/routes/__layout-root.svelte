<script lang="ts" context="module">
	export const load: Load = ({ url }) => {
		// we can always set document title using DOM method but
		// i think setting up from server side is much better
		const defaultTitle = 'My App'
		const titles: Record<string, string> = {
			'/about': 'About',
			'/auth/signin': 'Sign In'
			// ... other mapping
		}
		const title = titles[url.pathname] ? titles[url.pathname] + ' - ' + defaultTitle : defaultTitle
		return { props: { title } }
	}
</script>

<script lang="ts">
	import '$src/app-normalize.css'
	import '$src/app.css'
	import type { Load } from '@sveltejs/kit'

	export let title: string
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<slot />
