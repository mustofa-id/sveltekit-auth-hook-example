import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

/**
 * parse cookie from request header and set
 * parsed cookie value as user to `locals` object
 */
const cookieParser: Handle = async ({ event, resolve }) => {
	const userCookieValue = event.cookies.get('user')
	if (userCookieValue) {
		const userString = Buffer.from(userCookieValue, 'base64').toString()
		event.locals.user = userString ? JSON.parse(userString) : undefined
	}
	return await resolve(event)
}

/**
 * handle auth flow based on user information in `locals` object
 */
const authHandler: Handle = ({ event, resolve }) => {
	// TODO: get public path from routes dir
	const publicPaths = ['/auth/signin']
	const user = event.locals.user
	if (!user && !publicPaths.includes(event.url.pathname)) {
		return new Response(null, {
			status: 302,
			headers: {
				location: publicPaths[0] // index is depend on sign in page path order
			}
		})
	}
	return resolve(event)
}

export const handle = sequence(cookieParser, authHandler)
