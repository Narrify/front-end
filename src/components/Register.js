import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from './shared/AppTheme';

import '@fontsource/nunito';

const Card = styled(MuiCard)(({theme}) => ({
	display: 'flex',
	flexDirection: 'column',
	alignSelf: 'center',
	width: '100%',
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	margin: 'auto',
	[theme.breakpoints.up('sm')]: {
		maxWidth: '450px',
	},
	boxShadow:
		'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
	...theme.applyStyles('dark', {
		boxShadow:
			'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
	}),
}));

const LogInContainer = styled(Stack)(({theme}) => ({
	height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
	minHeight: '100%',
	padding: theme.spacing(2),
	[theme.breakpoints.up('sm')]: {
		padding: theme.spacing(4),
	},
	'&::before': {
		content: '""',
		display: 'block',
		position: 'absolute',
		zIndex: -1,
		inset: 0,
		backgroundImage:
			'radial-gradient(ellipse at 50% 50%, #9f7aea, #ed64a6, #f56565)',
		backgroundRepeat: 'no-repeat',
		...theme.applyStyles('dark', {
			backgroundImage:
				'radial-gradient(ellipse at 50% 50%, #9f7aea, #ed64a6, #f56565)',
		}),
	},
}));

export default function RegisterComponent(props) {
	const [emailError, setEmailError] = React.useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = React.useState('');

	const [passwordError, setPasswordError] = React.useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

	const [nameError, setNameError] = React.useState(false);
	const [nameErrorMessage, setNameErrorMessage] = React.useState('');

	const handleSubmit = (event) => {
		if (nameError || emailError || passwordError) {
			event.preventDefault();
			return;
		}
		const data = new FormData(event.currentTarget);
		console.log({
			name: data.get('name'),
			email: data.get('email'),
			password: data.get('password'),
		});
	};

	const validateInputs = () => {
		const email = document.getElementById('email');
		const password = document.getElementById('password');
		const name = document.getElementById('name');

		let isValid = true;

		if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
			setEmailError(true);
			setEmailErrorMessage('Please enter a valid email address.');
			isValid = false;
		} else {
			setEmailError(false);
			setEmailErrorMessage('');
		}

		if (!password.value || password.value.length < 6) {
			setPasswordError(true);
			setPasswordErrorMessage('Password must be at least 6 characters long.');
			isValid = false;
		} else {
			setPasswordError(false);
			setPasswordErrorMessage('');
		}

		if (!name.value || name.value.length < 1) {
			setNameError(true);
			setNameErrorMessage('Name is required.');
			isValid = false;
		} else {
			setNameError(false);
			setNameErrorMessage('');
		}

		return isValid;
	};

	return (
		<AppTheme {...props}>
			<CssBaseline enableColorScheme/>
			<LogInContainer direction="column" justifyContent="space-between">
				<Card variant="outlined">
					<Typography
						component="h1"
						variant="h4"
						sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
					>
						Register
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
							gap: 2,
						}}
					>
						<FormControl>
							<FormLabel htmlFor="name">Name</FormLabel>
							<TextField
								autoComplete="name"
								name="name"
								required
								fullWidth
								id="name"
								placeholder="Jon"
								error={nameError}
								helperText={nameErrorMessage}
								color={nameError ? 'error' : 'primary'}
							/>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor="email">Email</FormLabel>
							<TextField
								error={emailError}
								helperText={emailErrorMessage}
								id="email"
								type="email"
								name="email"
								placeholder="your@email.com"
								autoComplete="email"
								autoFocus
								required
								fullWidth
								variant="outlined"
								color={emailError ? 'error' : 'primary'}
							/>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor="password">Password</FormLabel>
							<TextField
								error={passwordError}
								helperText={passwordErrorMessage}
								name="password"
								placeholder="••••••"
								type="password"
								id="password"
								autoComplete="current-password"
								autoFocus
								required
								fullWidth
								variant="outlined"
								color={passwordError ? 'error' : 'primary'}
							/>
						</FormControl>
						<Divider></Divider>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							onClick={validateInputs}
						>
							Register
						</Button>
					</Box>
					<Divider></Divider>
					<Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
						<Typography sx={{textAlign: 'center'}}>
							Already have an account?{' '}
							<Link
								href="/login"
								variant="body2"
								sx={{alignSelf: 'center'}}
							>
								Log In
							</Link>
						</Typography>
					</Box>
				</Card>
			</LogInContainer>
		</AppTheme>
	);
}