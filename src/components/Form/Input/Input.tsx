import React, { ChangeEvent, useState } from 'react';
import './Input.scss';
import EyeOpen from '../../../assets/icons/EyeOpen.svg';
import EyeClosed from '../../../assets/icons/EyeClosed.svg';

interface InputProps {
  label: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, placeholder, type = 'text', value, onChange }) => {

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className='input__container'>
      {label && <label>{label}</label>}
      <input
        className='input__default'
        type={type === "password" ? showPassword ? "text" : "password" : type}
        placeholder={placeholder}
        value={value || ''}  // Utiliza el valor proporcionado o una cadena vacía si es nulo o indefinido
        onChange={onChange}
      />
      {type === 'password' && <div className='input__eye'>
        <img src={showPassword ? EyeClosed : EyeOpen} alt="" onClick={() => setShowPassword(prevEstado => !prevEstado)}/>
      </div> }
    </div>
  );
};

export default Input;
