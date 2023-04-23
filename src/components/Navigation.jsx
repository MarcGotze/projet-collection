import React from 'react';
import { NavLink } from 'react-router-dom';
import UserLog from './UserLog';

const Navigation = () => {
    return (
        <div>
            <UserLog />
            <NavLink to ="/profil"><button type="button">Créer un compte</button></NavLink>
        </div>
    );
};

export default Navigation;