<script lang="ts">
	import type { Errors } from './$types'

	export let errors: Errors

	$: ({ username = '', password = '', message } = errors ?? <Record<string, string>>{})
</script>

<pre>errors: {JSON.stringify(errors, null, 2)}</pre>

<form action="/auth/signin" method="post">
	<section>
		<h2>Please Sign In</h2>
	</section>

	<section class="fields">
		<label>
			<span>Username:</span>
			<!-- 
				autofocus to this field only if username 
				prop not empty in case sign in was failed so 
				user don't have to touch this field again to focus
			-->
			<!-- svelte-ignore a11y-autofocus -->
			<input
				type="text"
				name="username"
				value={username}
				placeholder="Your username here"
				spellcheck="false"
				autofocus={!!username}
				required
			/>
		</label>
		<label>
			<span>Password:</span>
			<input
				type="password"
				name="password"
				value={password}
				placeholder="Your password here"
				spellcheck="false"
				required
			/>
		</label>
	</section>

	<section class="actions">
		<button type="submit">Sign In</button>
	</section>

	<section>
		<em>{message ?? ''}</em>
	</section>
</form>

<style>
	form {
		width: max-content;
		margin: 2.5rem auto;
	}

	.fields,
	.actions {
		text-align: right;
	}

	h2,
	em {
		display: block;
		text-align: center;
	}

	em {
		color: orange;
	}

	label {
		display: block;
		padding: 0.25rem 0;
	}

	input {
		padding: 0.25rem 0.5rem;
	}

	section {
		margin: 0.25rem 0;
	}
</style>
