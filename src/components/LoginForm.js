import React, { useState } from 'react'
import { Link } from 'gatsby'
import { AnimatePresence, motion } from 'framer-motion'
import { Footer, Navbar } from 'flowbite-react'
import { XIcon } from '@heroicons/react/solid'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar el plugin ScrollTrigger
if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger)
}

export default function Layout({ children }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

	const navItems = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '#about' },
		{ name: 'Services', href: '#services' },
		{ name: 'Contact', href: '#contact' },
	]

	return (
		<div className="flex flex-col min-h-screen bg-[#EEEEEE] text-[#222831] font-poppins">
			<Navbar fluid className="bg-[#393E46] text-[#EEEEEE] fixed w-full z-10">
				<Navbar.Brand as={ Link } to="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold text-[#00ADB5]">
            Modern Gatsby
          </span>
				</Navbar.Brand>
				<div className="flex md:order-2">
					<Navbar.Toggle onClick={ toggleSidebar }/>
				</div>
				<Navbar.Collapse>
					{ navItems.map((item) => (
						<Navbar.Link
							key={ item.name }
							as={ Link }
							to={ item.href }
							active={ typeof window !== 'undefined' && window.location.pathname === item.href }
							className="text-[#EEEEEE] hover:text-[#00ADB5]"
						>
							{ item.name }
						</Navbar.Link>
					)) }
				</Navbar.Collapse>
			</Navbar>

			<AnimatePresence>
				{ isSidebarOpen && (
					<motion.div
						initial={ { x: '100%' } }
						animate={ { x: 0 } }
						exit={ { x: '100%' } }
						transition={ { type: 'spring', stiffness: 300, damping: 30 } }
						className="fixed inset-y-0 right-0 z-50 w-64 bg-[#393E46] p-4 shadow-lg"
					>
						<button onClick={ toggleSidebar } className="absolute top-4 right-4 text-[#EEEEEE]">
							<XIcon className="h-6 w-6"/>
						</button>
						<nav className="mt-8">
							{ navItems.map((item) => (
								<Link
									key={ item.name }
									to={ item.href }
									className="block py-2 text-[#EEEEEE] hover:text-[#00ADB5]"
									onClick={ toggleSidebar }
								>
									{ item.name }
								</Link>
							)) }
						</nav>
					</motion.div>
				) }
			</AnimatePresence>

			<main className="flex-grow">
				{ children }
			</main>

			<Footer container className="bg-[#393E46] text-[#EEEEEE]">
				<Footer.Copyright href="#" by="Modern Gatsby" year={ 2023 }/>
				<Footer.LinkGroup>
					<Footer.Link href="#" className="text-[#EEEEEE] hover:text-[#00ADB5]">About</Footer.Link>
					<Footer.Link href="#" className="text-[#EEEEEE] hover:text-[#00ADB5]">Privacy Policy</Footer.Link>
					<Footer.Link href="#" className="text-[#EEEEEE] hover:text-[#00ADB5]">Licensing</Footer.Link>
					<Footer.Link href="#" className="text-[#EEEEEE] hover:text-[#00ADB5]">Contact</Footer.Link>
				</Footer.LinkGroup>
			</Footer>
		</div>
	)
}