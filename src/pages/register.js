import React, { useState } from "react"
import { navigate } from "gatsby"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const Register = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log("Register attempted with:", { email, password, rememberMe })
		navigate("/")
	}

	return (
		<div className="min-h-screen bg-black flex items-center justify-center">
			<div className="bg-[#121212] p-8 rounded-lg w-full max-w-md">
				<h1 className="text-white text-3xl font-bold text-center mb-8">Register</h1>
				<form onSubmit={ handleSubmit } className="space-y-6">
					<div>
						<label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">
							username
						</label>
						<input
							id="email"
							type="text"
							value={ email }
							onChange={ (e) => setEmail(e.target.value) }
							placeholder="username"
							className="w-full px-3 py-2 bg-[#2a2a2a] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							required
						/>
					</div>
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
							e-mail
						</label>
						<input
							id="email"
							type="text"
							value={ email }
							onChange={ (e) => setEmail(e.target.value) }
							placeholder="e-mail"
							className="w-full px-3 py-2 bg-[#2a2a2a] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							required
						/>
					</div>
					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
							password
						</label>
						<div className="relative">
							<input
								id="password"
								type={ showPassword ? "text" : "password" }
								value={ password }
								onChange={ (e) => setPassword(e.target.value) }
								placeholder="password"
								className="w-full px-3 py-2 bg-[#2a2a2a] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
								required
							/>
							<button
								type="button"
								onClick={ () => setShowPassword(!showPassword) }
								className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
							>
								{ showPassword ? <FaEyeSlash/> : <FaEye/> }
							</button>
						</div>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
					>
						Register
					</button>
				</form>
			</div>
		</div>
	)
}

export default Register