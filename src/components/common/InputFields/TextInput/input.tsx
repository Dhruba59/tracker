import { Input, InputProps } from 'antd';

import './input.css';

const index = ({className, ...rest}: InputProps) => {
  return <Input className={`input ${className}`} {...rest} />;
};

export default index;
