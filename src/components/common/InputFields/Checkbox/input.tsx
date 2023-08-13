import { Checkbox, CheckboxProps, Input, InputProps } from 'antd';

import './input.css';

const index = ({className, ...rest}: CheckboxProps) => {
  return <Checkbox className={`checkbox ${className}`} {...rest} />;
};

export default index;
