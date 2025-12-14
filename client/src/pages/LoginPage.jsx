import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-container">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <img src="/Icon.png" alt="Todo App Logo" style={{ width: '64px', height: '64px' }} />
            </div>
            <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Organize your tasks, notes, and missions effortlessly in one secure place.
                Our simple design helps you stay focused and clear your mind.
                Start achieving your goals today.
            </p>
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="btn-primary">Login</button>
            </form>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        const result = await googleLogin(credentialResponse.credential);
                        if (result.success) {
                            navigate('/');
                        } else {
                            setError(result.message);
                        }
                    }}
                    onError={() => {
                        setError('Google Login Failed');
                    }}
                />
            </div>
            <div className="auth-footer">
                Don't have an account? <Link to="/register">Register</Link>
            </div>
        </div>
    );
};

export default LoginPage;
