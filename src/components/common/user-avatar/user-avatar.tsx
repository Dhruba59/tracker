import { Avatar, AvatarProps, Tooltip } from 'antd';
import './user-avatar.css';
export interface UserAvatarProps extends AvatarProps {
  title?: string;
};

const UserAvatar = ({ title, src, ...rest }: UserAvatarProps) => {
  return (
    <Tooltip title={title} placement='top'>
      <a>
        <Avatar src={src} {...rest} className='user-avatar'>
          {!src && title?.[0]?.toUpperCase()} 
        </Avatar>
      </a>
    </Tooltip>
  );
};

export default UserAvatar;