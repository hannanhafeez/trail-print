const isProductionEnv = process.env.NODE_ENV === 'production';
// const localBaseUrl = 'http://192.168.18.67:8000/api'
// const localBaseUrl = 'http://localhost:8000/api'

const baseUrlLocal = isProductionEnv ? 'https://mobank-aa2f3.firebaseapp.com/api' : 'http://localhost:3000/api'

export const API = {
	
}