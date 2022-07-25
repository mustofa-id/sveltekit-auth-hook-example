import type { GetSession, Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'
import cookie from 'cookie'

/**
 * parse cookie from request header and set
 * parsed cookie value as user to `locals` object
 */
const cookieParser: Handle = async ({ event, resolve }) => {
	const plainCookie = event.request.headers.get('cookie')
	if (plainCookie) {
		const parsedCookie = cookie.parse(plainCookie)
		const plainUser = parsedCookie.user && Buffer.from(parsedCookie.user, 'base64').toString()
		event.locals.user = plainUser ? JSON.parse(plainUser) : undefined
	}
	return await resolve(event)
}

/**
 * handle auth flow based on user information in `locals` object
 * TODO: this is doesn't work in production build
 */
const authHandler: Handle = async ({ event, resolve }) => {
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
	return await resolve(event)
}

export const handle = sequence(cookieParser, authHandler)

export const getSession: GetSession = ({ locals }) => {
	// in real app we may need to get user information
	// like role or permission from data source like db or api
	// and never pass user password or other sensitive data here
	return { user: locals.user }
}
