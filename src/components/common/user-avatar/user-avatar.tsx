import { Avatar, Tooltip } from 'antd';
import './user-avatar.css';
import { UserAvatarProps } from '@models/avatar';

const UserAvatar = ({ title, src, ...rest }: UserAvatarProps) => {
  const avatarContent = src ? (
    <Avatar src={src} className='user-avatar' {...rest}>
      <img src={src}/>
    </Avatar>
  ) : (
    <Avatar className='user-avatar' {...rest}>
      {title && title[0]?.toUpperCase()}
    </Avatar>
  );

  return (
    <>
      {avatarContent}
    </>
  );
};

export default UserAvatar;
