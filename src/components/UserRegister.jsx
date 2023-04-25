import React, { useState } from 'react';
import FormInput from './FormInput';

const UserRegister = () => {
    const [values, setValues] = useState({
        userName:"",
        password:"",
        email:"",
        localisation:""
    });

    const inputs = [
        {
            id:1,
            name:"userName",
            type:"text",
            placeholder:"Pseudo",
            errorMessage:"Le nom d'utilisateur ne doit pas contenir de caractères spéciaux",
            label:"Nom d'utilisateur",
            pattern: "[A-Za-z0-9]{3,16}$",
            required: true
        },
        {
            id:2,
            name:"email",
            type:"email",
            placeholder:"Email",
            errorMessage:"L'adresse email proposée n'est pas valide",
            label:"Email",
            required: true
        },
        {
            id:3,
            name:"password",
            type:"password",
            placeholder:"Mot de passe",
            errorMessage:"Au moins 8 caractères, contenir une majuscule, un nombre et un caractère spécial",
            label:"Mot de passe",
            pattern :"^(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$",
            required: true
        },
        {
            id:4,
            name:"localisation",
            type:"text",
            placeholder:"Ville",
            errorMessage:"",
            label:"Lieu d'habitation"
        },
    ]
    

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }
    console.log(values);
    return (
        <div class="form-wrapper">

            <form className="userform" onSubmit={handleSubmit}>
                <legend><h1>Créer compte</h1></legend>
                {inputs.map((input) => (
                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                ))}
                <button className="form-button">VALIDER</button>
            </form>
        </div>
    );
};

export default UserRegister;