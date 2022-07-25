<script lang="ts">
	import { page } from '$app/stores'

	const menu = [
		['/', 'Home'],
		['/about', 'About'],
		['/auth/signout', 'Sign Out']
	]
</script>

<header>
	<nav>
		{#each menu as [href, text]}
			<a class:active={$page.url.pathname === href} {href}>{text}</a>
		{/each}
	</nav>
</header>

<main>
	<slot />
</main>

<footer>&copy; 2022 SvelteKit Auth Hooks example</footer>

<style>
	nav {
		display: flex;
		gap: 2.5rem;
	}

	a {
		text-decoration: none;
		padding: 0.25rem 0.5rem;
	}

	a.active {
		border: dashed 1px grey;
	}

	header,
	main,
	footer {
		padding: 0.5rem 2.5rem;
	}
</style>
