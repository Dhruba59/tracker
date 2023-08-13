import { Button, ButtonProps } from 'antd';
import './button.css';

const CustomButton = ({ className, size, ...rest }: ButtonProps) => {
  return <Button className={`${className} ${size==='large' ? 'large': 'middle'} btn`} {...rest} />;
};

export default CustomButton;
