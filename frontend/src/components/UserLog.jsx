import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const UserLog = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    try {
        const response = await axios.post('http://localhost:4000/api/users/login', {
            email,
            password
        });
        setIsLoggedIn(true);
    } catch (error) {
        setError(error.response.data.error);
    }
};

if (isLoggedIn) {
    return <p>Vous êtes connecté {email}</p>;
}

    return (
        <div className="form-wrapper">
            <form className="userform" onSubmit={handleSubmit}>
                <label htmlFor="email">
                    Email :
                </label>
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                
                <label htmlFor="password">
                    Password :
                </label>
                <input type="password" name="password" value ={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit" name="submit" value ="Se connecter"/>
                {error && <p>{error}</p>}
            </form>
            <p>Vous ne possédez pas de compte ?</p>
            <p><NavLink to="/Register">Créer un compte</NavLink></p>
        </div>
    );
};

export default UserLog;