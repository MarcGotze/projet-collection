import React from 'react';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import UserCreate from '../components/UserCreate';

const Profil = () => {
    return (
        <div>
            <Header/>
            <h1>Profil utilisateur</h1>
            <UserCreate />
        </div>
    );
};

export default Profil;