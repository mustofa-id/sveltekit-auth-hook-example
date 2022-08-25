import type { LayoutLoad } from './$types'

export const load: LayoutLoad = ({ url }) => {
	// we can always set document title using DOM method but
	// i think setting up from server side is much better
	const defaultTitle = 'My App'
	const titles: Record<string, string> = {
		'/about': 'About',
		'/auth/signin': 'Sign In'
		// ... other mapping
	}
	const title = titles[url.pathname] ? titles[url.pathname] + ' - ' + defaultTitle : defaultTitle
	return { title }
}
