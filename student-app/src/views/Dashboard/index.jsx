import React from 'react';
import { useStytch, useStytchSession, useStytchUser } from "@stytch/react";
//components
import Navbar from '../../components/Navbar';

const Dashboard = () => {
    const stytch = useStytch();
    // Get the Stytch User object if available
    const { user } = useStytchUser();
    // Get the Stytch Session object if available
    const { session } = useStytchSession();
    return (
        <>
            <Navbar />
            <div className="card">
                <h1>Profile</h1>
                <h2>User object</h2>
                <pre className="code-block">
                    <code>{JSON.stringify(user, null, 2)}</code>
                </pre>

                <h2>Session object</h2>
                <pre className="code-block">
                    <code>{JSON.stringify(session, null, 2)}</code>
                </pre>
                <p>
                    You are logged in, and a Session has been created. The SDK stores the Session as
                    a token and a JWT in the browser cookies as{' '}
                    <span className="code">stytch_session</span> and{' '}
                    <span className="code">stytch_session_jwt</span> respectively.
                </p>
                {/* Revoking the session results in the session being revoked and cleared from browser storage. The user will return to Login.js */}
                <button className="primary" onClick={() => stytch.session.revoke()}>
                    Log out
                </button>
            </div>
        </>
    );
};

export default Dashboard;
