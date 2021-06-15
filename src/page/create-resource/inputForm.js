import React from 'react';

const Input = ({title, value, name,id,placeholder}) => {
    return (
        <div className="container-sb">
            <p className="mb-1">{title}</p>
            <input type="text" value={value} name={name} id={id} placeholder={placeholder} />
        </div>
    );
}

export default Input;