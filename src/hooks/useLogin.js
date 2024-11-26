import { useState } from 'react';

function useLogin() {
  const apiEndpoint = 'https://narrify.dev/auth/token';
  const [usernameError, setUsernameError] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const validateInputs = (username, password) => {
    let isValid = true;

    if (!username || username.length < 3) {
      setUsernameError(true);
      setUsernameErrorMessage('Please enter a valid username (min 3 characters).');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    const password = data.get('password');

    if (!validateInputs(username, password)) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username,
          password,
        }).toString(),
      });

      if (!response.ok) {
        throw new Error('Incorrect Username or Password');
      }

      const result = await response.json();
      localStorage.setItem('AuthToken', result.access_token);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    usernameError,
    usernameErrorMessage,
    passwordError,
    passwordErrorMessage,
    loading,
    error,
    success,
    handleSubmit,
  };
}

export default useLogin;
