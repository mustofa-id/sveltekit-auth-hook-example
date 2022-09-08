import { invalid, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = ({ locals }) => {
	// redirect to home is user already sign in
	if (locals.user) throw redirect(302, '/')
}

export const actions: Actions = {
	async default({ request, cookies }) {
		const form = await request.formData()
		const username = form.get('username')?.toString()
		const password = form.get('password')?.toString()

		// fake sign in validation
		// in real app you may need to check from data source like db or api
		// and compare hashed password using bycript or similar module
		if (username == 'admin' && username === password) {
			const user: User = { id: 1, username }
			// remember to not include password in cookie value
			// also you may need to secured this value using
			// jwt token instead of base64 string
			const userCookieValue = Buffer.from(JSON.stringify(user)).toString('base64')

			// setting up cookie
			cookies.set('user', userCookieValue, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict'
			})

			// redirect to home page
			throw redirect(303, '/')
		}

		// send user input back, this is good UX I think.
		return invalid(401, { username, password, message: 'Invalid username or password' })
	}
}
