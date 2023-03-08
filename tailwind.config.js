module.exports = {
	mode: 'jit',
	purge: ['./src/popup/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				whatsapp: `url('assets/whatsapp-pattern.png')`,
			},
		},
		colors: {
			primary: '#00a884',
			card: '#F1F2F6',
			font: '#ffffff',
		},
	},
	variants: {},
	plugins: [],
};
