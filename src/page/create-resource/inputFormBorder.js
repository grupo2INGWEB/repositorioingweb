import React from 'react';

const InputForm = ({ title, name, id, placeholder, value, onChange }) => {
    return (
        <div className="container-border">
            <p>{title}</p>
            <input type="text" name={name} id={id} placeholder={placeholder} value={value} onChangeCapture={onChange} />
        </div>
    );
}

export default InputForm;