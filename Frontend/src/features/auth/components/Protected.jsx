import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protected = ({ children, role="buyer" }) => {
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    console.log("Protected Check:", { user, loading, role });

    if (loading) {
        return (
            <div style={{ 
                height: '100vh', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: '#faf9f7',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
                color: '#999',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
            }}>
                Refining access...
            </div>
        )
    }

    if (!user) {
        console.log("No user found, redirecting to login...");
        return <Navigate to="/login" replace />
    }

    if (user.role !== role) {
        console.log(`Role mismatch: expected ${role}, got ${user.role}. Redirecting home...`);
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}

export default Protected