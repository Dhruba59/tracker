import { Button, ButtonProps } from 'antd';
import './button.css';

const AppButton = ({ className, size, ...rest }: ButtonProps) => {
  return <Button className={`${className} ${size==='large' ? 'large': 'middle'} btn`} {...rest} />;
};

export default AppButton;
