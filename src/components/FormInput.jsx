import React from 'react';

const FormInput = (props) => {
    const {label, onChange, id,  ...inputProps} = props;
    return (
        <div className="formInput">
            <label>{label}</label>
            <input {...inputProps} onChange={onChange}></input>
            <span>{errorMessage}</span>
        </div>
    );
};

export default FormInput;