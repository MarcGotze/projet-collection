import React from 'react';
import { NavLink } from 'react-router-dom';
import UserLog from './UserLog';

const Navigation = () => {
    return (
        <div>
            <UserLog />
            <button>Créer un compte</button>
        </div>
    );
};

export default Navigation;