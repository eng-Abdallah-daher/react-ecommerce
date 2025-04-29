import React from 'react';
import '../css/loginPage.css'; 
import { useState } from 'react';
import { authenticate } from './utils/loginFunctions';
import { setCookie } from './utils/Functions';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await authenticate(email, password);
        if (result.success) {
            const { name, email, cartitems, wishlist, userimage, address } = result.user;
            setCookie('userName', name, 7);
            setCookie('email', email, 7);
            setCookie('cartItems', cartitems, 7);
            setCookie('userimage', userimage, 7);
            setCookie('wishlistItems', wishlist, 7);
            setCookie('address', address, 7);
            window.open('/', '_self');
        } else {
            alert('Wrong email or password.');
        }
    };



    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
