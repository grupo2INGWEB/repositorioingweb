import React from 'react';

const InputForm = ({ title, name, id, placeholder}) => {
    return (
        <div className="container-border">
            <p>{title}</p>
            <input type="text" name={name} id={id} placeholder={placeholder} />
        </div>
    );
}

export default InputForm;