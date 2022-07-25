/// <reference types="@sveltejs/kit" />

type User = {
	id: number
	username: string
	password?: string
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		user: User
	}

	// interface Platform {}

	interface Session {
		user: User
	}

	// interface Stuff {}
}
