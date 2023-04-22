module.exports = {
	mode: 'jit',
	content: ['./src/popup/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: {},
		},
		colors: {
			ytred: '#FF0000',
			ytdark: '#0F0F0F',
			ytgray3f: '#3F3F3F',
			ytrgray28: '#282828',
			ytrgray40: '#404040',
			title: '#F1F1F1',
			body: '#AAAAAA',
		},
	},
	variants: {},
	plugins: [],
};
