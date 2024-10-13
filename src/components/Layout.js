import React from "react"

const pages = [
	{
		url: "/",
		title: "Home"
	},
	{
		url: "/panel",
		title: "Panel"
	},
	{
		url: "/profile",
		title: "Profile"
	}
]

const Layout = ({ child }) => {
	return (
		<div>
			<header>
			</header>

			<main>
				{ child }
			</main>

			<footer>
			</footer>
		</div>
	)
}

export default Layout