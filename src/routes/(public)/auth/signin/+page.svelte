<script lang="ts">
	import type { ActionData } from './$types'

	export let form: ActionData
</script>

<form method="post">
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
				value={form?.username ?? null}
				placeholder="Your username here"
				spellcheck="false"
				autofocus={!!form?.username}
				required
			/>
		</label>
		<label>
			<span>Password:</span>
			<input
				type="password"
				name="password"
				value={form?.password ?? null}
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
		<em>{form?.message ?? ''}</em>
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
