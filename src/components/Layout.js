import React from "react"
import PropTypes from "prop-types"

import { Flowbite, Footer, Navbar } from "flowbite-react"
import { BsDiscord, BsGithub, BsTwitterX } from "react-icons/bs";

const customTheme = {
	navbar: {
		root: {
			base: "bg-[#393E46] text-[#EEEEEE] fixed w-full z-10 px-2 py-2.5 sm:px-4",
		},
		brand: {
			base: "text-xl font-bold text-red-600 hover:text-blue-300",
		},
		link: {
			base: "block py-2 pl-3 pr-4 md:p-0",
			active: {
				on: "",
				off2: "text-lg text-[#EEEEEE] hover:text-[#00ADB5]",
				off: "text-lg text-[#EEEEEE] hover:text-[#00ADB5]"
			},
		},
	},

	footer: {
		root: {
			base: "grid grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4 bg-[#393E46] w-full md:flex items-center justify-between",
		},

		groupLink: {
			base: "flex flex-wrap text-base text-[#EEEEEE]",
			link: {
				base: "me-4 last:mr-0 md:mr-6",
				href: "hover:text-[#00ADB5]"
			},
			col: "flex-col space-y-4"
		},

		copyright: {
			base: "font-bold text-m text-[#EEEEEE] hover:text-[#00ADB5] text-center",
			href: "ml-1",
			span: "ml-1"
		},

		icon: {
			base: "text-[#EEEEEE] hover:text-[#00ADB5]",
			size: "h-5 w-5"
		}
	}
}

const pages = [
	{ name: "Home", url: "/" },
	{ name: "Panel", url: "/panel" },
	{ name: "Profile", url: "/profile" },
	{ name: " ", url: "/" },
	{ name: "Login", url: "/login" },
	{ name: "Register", url: "/register" },
]

//TODO: Split other components into individual components

const FooterComponent = () => {
	const links = [
		{ icon: BsDiscord, name: "Discord", url: "https://discord.com/", },
		{ icon: BsGithub, name: "GitHub", url: "https://github.com/", },
		{ icon: BsTwitterX, name: "X", url: "https://x.com/", }
	]

	return (
		<Footer>
			<Footer.Copyright href="/" by="Narrify" year={ 2024 }/>

			<Footer.LinkGroup>
				{ links.map(({ icon: Icon, name, url }) => (
					<Footer.Link key={ name } href={ url }>
						<Icon className="h-6 w-6"/>
					</Footer.Link>
				)) }
			</Footer.LinkGroup>
		</Footer>
	);
};

const Layout = ({ children }) => {
	return (
		<Flowbite theme={ { theme: customTheme } }>
			<div className="flex flex-col min-h-screen bg-[#EEEEEE] text-[#222831] font-poppins">
				<header className="flex">
					<Navbar fluid>
						<Navbar.Brand href="/">
							<span className="self-center whitespace-nowrap text-xl font-semibold text-[#00ADB5]">
								Narrify
							</span>
						</Navbar.Brand>

						<Navbar.Toggle/>

						<Navbar.Collapse>
							{ pages.map(({ name, url }) => (
								<Navbar.Link key={ name } href={ url }>{ name }</Navbar.Link>
							)) }
						</Navbar.Collapse>
					</Navbar>
				</header>

				<main className="flex-grow">
					{ children }
				</main>

				<FooterComponent/>
			</div>
		</Flowbite>
	)
}

Layout.propTypes = {
	children: PropTypes.node,
}

export default Layout
