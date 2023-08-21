import { Checkbox, CheckboxProps } from 'antd';

import './checkbox.css';

const CheckboxInput = ({className, ...rest}: CheckboxProps) => {
  return <Checkbox className={`checkbox ${className}`} {...rest} />;
};

export default CheckboxInput;
