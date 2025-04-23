import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../services/authService';
import api from '../utils/api';

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/user/me');
                if (response.data.error) {
                    setError(response.data.message);
                } else {
                    setUser(response.data.user);
                }
            } catch (err) {
                setError('Failed to fetch user data');
                navigate('/login');
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        import('../services/authService').then(({ logout }) => {
            logout();
            navigate('/login');
        });
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2 style={{ color: '#2d6cdf' }}>Welcome to VehicleVault Dashboard</h2>
            {error && <p style={{ color: '#2d5cf6' }}>{error}</p>}
            {user ? (
                <>
                    <p>Hello, {user.firstName}!</p>
                    <p>Email: {user.email}</p>
                    <button
                        onClick={handleLogout}
                        style={{ backgroundColor: '#2d6cdf', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Logout
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}