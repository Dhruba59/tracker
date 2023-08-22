import { Input, InputProps } from 'antd';

import './password-input.css';

const PasswordInput = ({className, ...rest}: InputProps) => {
  return <Input.Password className={`password-input ${className}`} {...rest} />;
};

export default PasswordInput;
