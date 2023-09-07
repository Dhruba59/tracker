import { Input, InputProps } from 'antd';

import './text-input.css';

const TextInput = ({className, ...rest}: InputProps) => {
  return <Input className={`text-input ${className}`} {...rest} />;
};

export default TextInput;
