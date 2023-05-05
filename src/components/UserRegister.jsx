import React, { useState } from 'react';
import FormInput from './FormInput';
import axios from 'axios';

const UserRegister = () => {
    const [values, setValues] = useState({
        userName:"",
        password:"",
        mail:"",
        location:""
    });

    const [error, setError] = useState(null);

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
            name:"mail",
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
            name:"location",
            type:"text",
            placeholder:"Ville",
            errorMessage:"",
            label:"Lieu d'habitation"
        },
    ]
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitted");
        const data = values;
        console.log(data);
        // axios.post('http://localhost:5000/users/register', data);
        // const reponse = await Response.json();
        // console.log(reponse);
        
        const reponse = await fetch('http://localhost:5000/users/register', {
           method: 'POST',
           body: JSON.stringify(data),
           headers: {
            'Content-Type' : 'application/json'
           }
        })
        console.log("inside fetch");
        console.log(reponse);
        const json = await Response.json();

        if(!Response.ok) {
            setError(json.message)
            console.log("reponse not ok");
        }
        if(Response.ok) {
            setError(null);
            setValues({
                userName:"",
                password:"",
                mail:"",
                location:""
            });
            console.log("Nouvel utilisateur créé", json)
        }
    }

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }
    return (
        <div className="form-wrapper">

            <form className="userform" onSubmit={handleSubmit}>
                <legend><h1>Créer compte</h1></legend>
                {inputs.map((input) => (
                    <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
                ))}
                <button className="form-button">Submit</button>
            </form>
        </div>
    );
};

export default UserRegister;