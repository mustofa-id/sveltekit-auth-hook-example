<script lang="ts">
	import '$src/app-normalize.css'
	import '$src/app.css'
	import type { LayoutData } from './$types'

	export let data: LayoutData

	$: ({ title } = data)
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<slot />
