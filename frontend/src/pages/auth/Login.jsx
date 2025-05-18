import axios from 'axios'
import { useState } from 'react'

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://api-gateway:3000/auth/login', {
                username,
                password
            });

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            alert("Login successful!")

            window.location.href = '/user/dashboard';
        }
        catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    }

    return (
        <>
            <div className="auth-container">
                <form onSubmit={handleLogin}>
                    <label>Username: </label>
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    <label>Password: </label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    {error && <p>{error}</p>}
                    <button type='submit'>Submit</button>
                </form>
                <p>
                    Don't have an account?
                    <button type='button' onClick={() => (window.location.href = '/signup')}>Signup</button>
                </p>
            </div>
        </>
    )
}