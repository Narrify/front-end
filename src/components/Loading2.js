import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LoadingPage = ({ onLoadingComplete }) => {
	const beamRef = useRef(null);

	useEffect(() => {
		const beam = beamRef.current;

		// Configuración inicial de la barra
		gsap.set(beam, { scaleX: 0, opacity: 0, backgroundPosition: '0% 0%' });

		// Animación principal combinada
		const tl = gsap.timeline({
			onComplete: () => {
				// Desaparece al completar la animación
				gsap.to(beam.parentNode, {
					opacity: 0,
					duration: 0.5,
					onComplete: onLoadingComplete,
				});
			},
		});

		// Animación de la barra de carga RGB
		tl.to(beam, {
			scaleX: 1,
			opacity: 1,
			duration: 1.5,
			ease: 'power2.inOut',
			background: 'linear-gradient(90deg, rgba(255,0,0,1), rgba(0,255,0,1), rgba(0,0,255,1))',
			backgroundSize: '300% 100%', // Ajuste para que el gradiente sea más visible
		})
			.to(beam, {
				backgroundPosition: '100% 0%', // Mueve el gradiente a lo largo de la barra
				duration: 2.5,
				ease: 'linear',
				repeat: -1, // Animación continua del gradiente RGB
				yoyo: true,
			})
			.to(beam, {
				scaleX: 0,
				opacity: 0,
				duration: 1.5,
				ease: 'power2.inOut',
			});

	}, [onLoadingComplete]);

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-[#222831] z-50">
			{/* Barra de carga con gradiente RGB */ }
			<div
				ref={ beamRef }
				className="w-64 h-4 rounded-full"
				style={ { transformOrigin: 'left center', backgroundSize: '300% 100%' } }
			></div>
		</div>
	);
};

export default LoadingPage;
