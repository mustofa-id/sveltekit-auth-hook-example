import { redirect, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = ({ cookies }) => {
	cookies.delete('user')
	throw redirect(303, '/')
}
