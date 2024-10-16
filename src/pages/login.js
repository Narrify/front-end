import React, { useState } from "react"
import { navigate } from "gatsby"
import { FaEye, FaEyeSlash } from "react-icons/fa"

const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [rememberMe, setRememberMe] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log("Login attempted with:", { email, password, rememberMe })
		navigate("/")
	}

	return (
		<div className="min-h-screen bg-black flex items-center justify-center">
			<div className="bg-[#121212] p-8 rounded-lg w-full max-w-md">
				<h1 className="text-white text-3xl font-bold text-center mb-8">Log in</h1>
				<form onSubmit={ handleSubmit } className="space-y-6">
					<div>
						<label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">
							username
						</label>
						<input
							id="username"
							type="text"
							value={ email }
							onChange={ (e) => setEmail(e.target.value) }
							placeholder="username"
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
								placeholder="Password"
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
					<div className="flex items-center justify-between">
						<span className="text-sm text-gray-400">Remember me</span>
						<label htmlFor="remember-me" className="flex items-center cursor-pointer">
							<div className="relative">
								<input
									id="remember-me"
									type="checkbox"
									className="sr-only"
									checked={ rememberMe }
									onChange={ () => setRememberMe(!rememberMe) }
								/>
								<div className={ `block w-10 h-6 rounded-full ${ rememberMe ? "bg-blue-600" : "bg-gray-600" }` }></div>
								<div className={ `dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${ rememberMe ? "transform translate-x-4" : "" }` }></div>
							</div>
						</label>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
					>
						Log In
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login