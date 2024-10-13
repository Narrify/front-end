import React from "react"
import PropTypes from "prop-types"

import { DarkThemeToggle, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react"

const pages = [
	{
		url: "/",
		name: "Home"
	},
	{
		url: "/panel",
		name: "Panel"
	},
	{
		url: "/profile",
		name: "Profile"
	}
]

const Layout = ({ children }) => {
	return (
		<div className="">
			<header>
				<Navbar>
					<NavbarBrand href='/'>
						Page
					</NavbarBrand>

					<div className>
						<DarkThemeToggle/>
						<NavbarToggle/>
					</div>

					<NavbarCollapse>
						{ pages.map(({ url, name }) => {
							return (
								<NavbarLink key={ url } href={ url }>
									{ name }
								</NavbarLink>
							)
						}) }
					</NavbarCollapse>
				</Navbar>
			</header>

			<main>
				{ children }
			</main>

			<footer>
			</footer>
		</div>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired
}

export default Layout