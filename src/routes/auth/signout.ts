import type { RequestHandler } from '@sveltejs/kit'
import { serialize } from 'cookie'

export const GET: RequestHandler = () => {
	return {
		status: 302,
		headers: {
			location: '/auth/signin',
			'set-cookie': serialize('user', '', {
				path: '/',
				expires: new Date(0)
			})
		}
	}
}
