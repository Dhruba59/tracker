import EmtpySpaceIcon from '@images/empty-space-icon.png';
import './empty-page-card.css';
import AppButton from '../button';
import { EmptyProps } from 'antd';

export interface EmptyPageCardProps {
  title?: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

const EmptyPageCard = ({ title, buttonText, onButtonClick }: EmptyPageCardProps) => {
  return (
    <div className='empty-page-container'>
      <img src={EmtpySpaceIcon} />
      <div className='empty-page-row-2'>
        <p>{title}</p>
        <AppButton className='empty-page-btn' type='primary' onClick={onButtonClick}>{buttonText}</AppButton>
      </div>
    </div>
  );
};

export default EmptyPageCard;