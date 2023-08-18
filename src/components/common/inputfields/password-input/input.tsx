import { Input, InputProps } from 'antd';

import './style.css';

const index = ({className, ...rest}: InputProps) => {
  return <Input.Password className={`input ${className}`} {...rest} />;
};

export default index;
