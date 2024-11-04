import flowbite from "flowbite-react/tailwind";
import { BiFontFamily } from "react-icons/bi";

module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./src/components/**/*.{js,jsx,ts,tsx}",
		flowbite.content(),
	],
	theme: {
		extend: {
			colors: {
				primary: '#f6e5fa',
				secondary: '#f4c3e8',
			},
		},
	},
	plugins: [
		flowbite.plugin()
	]
};

