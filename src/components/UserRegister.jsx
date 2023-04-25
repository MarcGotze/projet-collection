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
            label:"Nom d'utilisateur"
        },
        {
            id:2,
            name:"email",
            type:"email",
            placeholder:"Email",
            label:"Email"
        },
        {
            id:3,
            name:"password",
            type:"password",
            placeholder:"Mot de passe",
            label:"Mot de passe"
        },
        {
            id:4,
            name:"localisation",
            type:"text",
            placeholder:"Ville",
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