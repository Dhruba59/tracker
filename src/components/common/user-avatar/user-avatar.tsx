import { Avatar, AvatarProps, Tooltip } from 'antd';
export interface UserAvatarProps extends AvatarProps {
  title: string;
};

const UserAvatar = ({ title, src, ...rest }: UserAvatarProps) => {
  return (
    <Tooltip title={title} placement='top'>
      <a href=''>
        <Avatar {...rest}>
          {!src && title[0]} 
        </Avatar>
      </a>
    </Tooltip>
  );
};

export default UserAvatar;