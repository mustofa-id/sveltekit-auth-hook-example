import type { RequestHandler } from '@sveltejs/kit'
import { serialize } from 'cookie'

export const GET: RequestHandler = ({ locals }) => {
	// redirect to home is user already sign in
	if (locals.user) {
		return {
			status: 302,
			headers: {
				location: '/'
			}
		}
	}
	return {}
}

export const POST: RequestHandler = async ({ request }) => {
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
		return {
			status: 302,
			headers: {
				// redirect to home page
				location: '/',
				// setting up cookie
				'set-cookie': serialize('user', userCookieValue, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict'
				})
			}
		}
	}

	// send user input back, this is good UX I think.
	return { body: { username, password, message: 'Invalid username or password' } }
}
