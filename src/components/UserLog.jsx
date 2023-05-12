import React from 'react';
import { NavLink } from 'react-router-dom';

const UserLog = () => {
    return (
        <div className="form-wrapper">
            <form className="userform">
                <label htmlFor="userName">
                    Email :
                </label>
                <input type="text" name="userName"/>
                <label htmlFor="userPassword">
                    Password :
                </label>
                <input type="text" name="userPassword"/>
                <input type="submit" name="submit" value ="Se connecter"/>
            </form>
            <p>Vous ne possédez pas de compte ?</p>
            <p><NavLink to="/Register">Créer un compte</NavLink></p>
        </div>
    );
};

export default UserLog;