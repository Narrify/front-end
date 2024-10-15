import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const LoadingPage = ({ onLoadingComplete }) => {
	const beamRef = useRef(null)

	useEffect(() => {
		const beam = beamRef.current

		gsap.set(beam, { scaleX: 0, opacity: 0 })

		const tl = gsap.timeline({
			repeat: 2,
			onComplete: () => {
				gsap.to(beam.parentNode, {
					opacity: 0,
					duration: 0.5,
					onComplete: onLoadingComplete
				})
			}
		})

		tl.to(beam, {
			scaleX: 1,
			opacity: 1,
			duration: 1,
			ease: "power2.inOut"
		})
			.to(beam, {
				background: "linear-gradient(90deg, #ff0000, #00ff00, #0000ff)",
				duration: 2,
				ease: "none"
			})
			.to(beam, {
				scaleX: 0,
				opacity: 0,
				duration: 1,
				ease: "power2.inOut"
			})

	}, [onLoadingComplete])

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-[#222831] z-50">
			<div
				ref={ beamRef }
				className="w-64 h-2 bg-[#00ADB5]"
				style={ { transformOrigin: "left center" } }
			></div>
		</div>
	)
}

export default LoadingPage