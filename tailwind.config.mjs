/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		colors: {
			'text': '#030a14',
			'background': '#f0f6fd',
			'primary': '#004bad',
			'primary-lighter': '#93b6e4',
			'primary-light': '#5991db',
			'secondary': '#efe37d',
			'accent': '#62eb58',
			'white': '#ffffff',
			'black': '#0f1219',
			'red': '#ef4444',
			'green': '#16a34a'
		}
	},
	plugins: [],
}
