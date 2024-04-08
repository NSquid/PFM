import React, { useState } from 'react';

function LoginFunction({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); 
  
    const handleLogin = async (event) => {
        event.preventDefault();
  
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
  
            const data = await response.json();
            console.log(data);
            console.log(response);
  
            if (data.success) {
                onLogin();
            } else {
                setError('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Login failed');
        }
    };
  
    return (
        <div className="login-form">
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button type="submit">Log in</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
  }

export default LoginFunction;