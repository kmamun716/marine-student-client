import React from 'react';

const FormInput = ({type, name, placeholder, register}) => {
    return (
        <div>
            <input 
                type={type} 
                placeholder={placeholder} 
                className="input input-bordered w-full max-w-xs" 
                {...register(`${name}`, { required: true })} 
                />
        </div>
    );
};

export default FormInput;