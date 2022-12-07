export const isProductionEnv = process.env.NODE_ENV === 'production';
// const localBaseUrl = 'http://192.168.18.67:8000/api'
// const localBaseUrl = 'http://localhost:8000/api'

export const baseUrl = isProductionEnv ? 'http://sportprints.co' : 'http://localhost:3000'
export const adminBaseUrl = "http://admin.sportprints.co/index.php"
// export const baseUrl = isProductionEnv ? 'http://localhost:3000' : 'http://localhost:3000'

export const API = {
	strava_authorize : '/api/strava-authorize',
	strava_deauthorize : '/api/strava-deauthorize',
	exchange_token: '/api/update-auth/exchange_token',
	refresh_token: '/api/update-auth/refresh_token',

	gpx_from_strava: '/api/gpx-from-strava',
	session_state: '/api/session-state',
	reset_session_state: '/api/reset-session-state',

	admin_image_upload: adminBaseUrl + "/api/addnewimagedata",
	admin_add_order: adminBaseUrl + "/api/addorder"
}