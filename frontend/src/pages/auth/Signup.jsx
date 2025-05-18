import axios from 'axios'
import { useState, useRef } from 'react'

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const roleRef = useRef(null);
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const role = roleRef.current.value;
            const res = await axios.post('http://localhost:5000/auth/register', {
                username,
                password,
                role
            });

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            alert("Singup successful!")

            window.location.href = '/login';
        }
        catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    }

    return (
        <>
            <div className="auth-container">
                <form onSubmit={handleSignup}>
                    <label>Username: </label>
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    <label>Password: </label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <label>Role: </label>
                    <select id="role" ref={roleRef}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    {error && <p>{error}</p>}
                    <button type='submit'>Submit</button>
                </form>
                <p>
                    Already have an account?
                    <button type='button' onClick={() => (window.location.href = '/login')}>Login</button>
                </p>
            </div>
        </>
    )
}