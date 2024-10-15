import React, { useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Layout from '../components/LoginForm'

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger)
}

const IndexPage = () => {
	const sectionRefs = useRef([])

	useEffect(() => {
		if (typeof window === 'undefined') return

		// Animaciones de las secciones
		sectionRefs.current.forEach((section, index) => {
			gsap.from(section, {
				opacity: 0,
				y: 100,
				duration: 1,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: section,
					start: 'top 80%',
					end: 'bottom 20%',
					toggleActions: 'play none none reverse',
				},
			})
		})

		// Animación del fondo
		gsap.to('body', {
			backgroundColor: '#222831',
			scrollTrigger: {
				trigger: '#services',
				start: 'top center',
				end: 'bottom center',
				scrub: true,
			},
		})

	}, [])

	return (
		<Layout>
			<section id="hero" className="h-screen flex items-center justify-center bg-[#222831] pt-16">
				<div className="text-center">
					<h1 className="text-6xl font-bold mb-4 text-[#EEEEEE]">Welcome to <span className="text-[#00ADB5]">ModernGatsby</span></h1>
					<p className="text-xl mb-8 text-[#EEEEEE]">Scroll down for an animated experience</p>
					<Link to="#about" className="bg-[#00ADB5] text-[#222831] px-6 py-3 rounded-full hover:bg-opacity-80 transition-colors">
						Get Started
					</Link>
				</div>
			</section>

			<section
				id="about"
				ref={ el => sectionRefs.current[0] = el }
				className="min-h-screen flex items-center justify-center bg-[#393E46] py-20"
			>
				<div className="container mx-auto px-4">
					<h2 className="text-4xl font-bold mb-8 text-center text-[#EEEEEE]">About Us</h2>
					<p className="text-xl max-w-2xl mx-auto text-center text-[#EEEEEE]">
						We are a modern web development company specializing in creating stunning,
						performant websites using cutting-edge technologies like Gatsby and GSAP.
					</p>
				</div>
			</section>

			<section
				id="services"
				ref={ el => sectionRefs.current[1] = el }
				className="min-h-screen flex items-center justify-center bg-[#222831] py-20"
			>
				<div className="container mx-auto px-4">
					<h2 className="text-4xl font-bold mb-8 text-center text-[#EEEEEE]">Our Services</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{ ['Web Development', 'UI/UX Design', 'Performance Optimization'].map((service, index) => (
							<div key={ index } className="bg-[#393E46] p-6 rounded-lg text-center">
								<h3 className="text-2xl font-semibold mb-4 text-[#00ADB5]">{ service }</h3>
								<p className="text-[#EEEEEE]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
							</div>
						)) }
					</div>
				</div>
			</section>

			<section
				id="contact"
				ref={ el => sectionRefs.current[2] = el }
				className="min-h-screen flex items-center justify-center bg-[#393E46] py-20"
			>
				<div className="container mx-auto px-4">
					<h2 className="text-4xl font-bold mb-8 text-center text-[#EEEEEE]">Contact Us</h2>
					<form className="max-w-md mx-auto">
						<input type="text" placeholder="Name" className="w-full mb-4 p-2 rounded bg-[#EEEEEE] text-[#222831]"/>
						<input type="email" placeholder="Email" className="w-full mb-4 p-2 rounded bg-[#EEEEEE] text-[#222831]"/>
						<textarea placeholder="Message" rows="4" className="w-full mb-4 p-2 rounded bg-[#EEEEEE] text-[#222831]"></textarea>
						<button type="submit" className="w-full bg-[#00ADB5] text-[#222831] py-2 rounded hover:bg-opacity-80 transition-colors">
							Send Message
						</button>
					</form>
				</div>
			</section>
		</Layout>
	)
}

export default IndexPage