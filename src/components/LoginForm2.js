import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import styled, { ThemeProvider } from "styled-components"
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaMoon, FaSun } from "react-icons/fa"

const lightTheme = {
	background: "#f0f2f5",
	cardBackground: "#ffffff",
	text: "#333333",
	primaryColor: "#1890ff",
	inputBackground: "#ffffff",
	inputText: "#333333",
	inputBorder: "#d9d9d9",
}

const darkTheme = {
	background: "#1f1f1f",
	cardBackground: "#2f2f2f",
	text: "#ffffff",
	primaryColor: "#1890ff",
	inputBackground: "#3f3f3f",
	inputText: "#ffffff",
	inputBorder: "#4f4f4f",
}

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${ props => props.theme.background };
    transition: all 0.3s ease;
`

const Card = styled.div`
    background-color: ${ props => props.theme.cardBackground };
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    position: relative;
    transition: all 0.3s ease;
`

const Title = styled.h2`
    color: ${ props => props.theme.text };
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 1.5rem;
    transition: color 0.3s ease;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const InputWrapper = styled.div`
    position: relative;
`

const Input = styled.input`
    width: 100%;
    padding: 0.75rem 2.5rem 0.75rem 2.5rem;
    border: 1px solid ${ props => props.theme.inputBorder };
    border-radius: 4px;
    font-size: 1rem;
    background-color: ${ props => props.theme.inputBackground };
    color: ${ props => props.theme.inputText };
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: ${ props => props.theme.primaryColor };
    }
`

const InputIcon = styled.span`
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${ props => props.theme.text };
    opacity: 0.5;
    transition: color 0.3s ease;
`

const TogglePasswordButton = styled.button`
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: ${ props => props.theme.text };
    opacity: 0.5;
    transition: color 0.3s ease;
`

const RememberMeWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${ props => props.theme.text };
    transition: color 0.3s ease;
`

const Checkbox = styled.input`
    margin: 0;
`

const SubmitButton = styled.button`
    background-color: ${ props => props.theme.primaryColor };
    color: white;
    border: none;
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${ props => props.theme.primaryColor }dd;
    }
`

const Link = styled.a`
    color: ${ props => props.theme.primaryColor };
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.3s ease;

    &:hover {
        text-decoration: underline;
    }
`

const ThemeToggle = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: ${ props => props.theme.text };
    cursor: pointer;
    font-size: 1.25rem;
    transition: transform 0.3s ease, color 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.95) rotate(360deg);
    }
`

const LoginForm2 = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [rememberMe, setRememberMe] = useState(false)
	const [theme, setTheme] = useState("light")

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme")
		if (savedTheme) {
			setTheme(savedTheme)
		} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
			setTheme("dark")
		}
	}, [])

	useEffect(() => {
		localStorage.setItem("theme", theme)
	}, [theme])

	const toggleTheme = () => {
		setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		// Here you would typically handle the login logic
		console.log("Login attempted with:", { email, password, rememberMe })
		// For demonstration, let's navigate to a hypothetical dashboard page
		navigate("/dashboard")
	}

	return (
		<ThemeProvider theme={ theme === "light" ? lightTheme : darkTheme }>
			<Container>
				<Card>
					<ThemeToggle onClick={ toggleTheme }>
						{ theme === "light" ? <FaMoon/> : <FaSun/> }
					</ThemeToggle>
					<Title>Welcome Back</Title>
					<Form onSubmit={ handleSubmit }>
						<InputWrapper>
							<InputIcon>
								<FaEnvelope/>
							</InputIcon>
							<Input
								type="email"
								placeholder="Email"
								value={ email }
								onChange={ (e) => setEmail(e.target.value) }
								required
							/>
						</InputWrapper>
						<InputWrapper>
							<InputIcon>
								<FaLock/>
							</InputIcon>
							<Input
								type={ showPassword ? "text" : "password" }
								placeholder="Password"
								value={ password }
								onChange={ (e) => setPassword(e.target.value) }
								required
							/>
							<TogglePasswordButton
								type="button"
								onClick={ () => setShowPassword(!showPassword) }
							>
								{ showPassword ? <FaEyeSlash/> : <FaEye/> }
							</TogglePasswordButton>
						</InputWrapper>
						<RememberMeWrapper>
							<Checkbox
								type="checkbox"
								id="rememberMe"
								checked={ rememberMe }
								onChange={ (e) => setRememberMe(e.target.checked) }
							/>
							<label htmlFor="rememberMe">Remember me</label>
						</RememberMeWrapper>
						<SubmitButton type="submit">Sign In</SubmitButton>
					</Form>
					<div>
						<p style={ { textAlign: "center", marginTop: "1rem" } }>
							<Link href="/forgot-password">Forgot password?</Link>
						</p>
						<p style={ { textAlign: "center", marginTop: "0.5rem" } }>
							Don't have an account? <Link href="/signup">Sign up</Link>
						</p>
					</div>
				</Card>
			</Container>
		</ThemeProvider>
	)
}

export default LoginForm2