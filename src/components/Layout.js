import React from "react"
import PropTypes from "prop-types"

import { Flowbite, Navbar } from "flowbite-react"

const customTheme = {
	navbar: {
		brand: {
			base: "text-xl font-bold text-blue-700 hover:text-blue-300",
		},
		link: {
			base: "text-lg text-gray-500 hover:text-gray-800",
			active: {
				on: "text-gray-800 font-semibold underline",
				off: "text-gray-500 hover:text-gray-800",
			},
		},
	},
}

const Layout = ({ children }) => {
	return (
		<Flowbite theme={ { theme: customTheme } }>
			<div>
				<header className="flex">
					<Navbar fluid rounded>
						<Navbar.Brand href="/">Narrify</Navbar.Brand>
						<Navbar.Toggle/>
						<Navbar.Collapse>
							<Navbar.Link href="/" active={ true }>
								Home
							</Navbar.Link>
							<Navbar.Link href="/panel">Panel</Navbar.Link>
							<Navbar.Link href="/login">Profile</Navbar.Link>
						</Navbar.Collapse>
					</Navbar>
				</header>

				<main className="flex">
					{ children }
				</main>

				<footer className="flex">footer</footer>
			</div>
		</Flowbite>
	)
}

Layout.propTypes = {
	children: PropTypes.node,
}

export default Layout
