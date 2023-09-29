import { Avatar, Tooltip } from 'antd';
import './user-avatar.css';
import { UserAvatarProps } from '@models/avatar';
import { useEffect, useState } from 'react';
import { stringToHslColor } from '@helpers/global-helpers';

const UserAvatar = ({ title, src, ...rest }: UserAvatarProps) => {
  const avatarContent = src ? (
    <Avatar src={src} className='user-avatar' {...rest}>
      <img src={src}/>
    </Avatar>
  ) : (
    <Avatar style={{backgroundColor: stringToHslColor(title ?? '')}} className='user-avatar' {...rest}>
      {title && title[0]?.toUpperCase()}
    </Avatar>
  );

  return (
    <>
      <Tooltip title={title}>
        {avatarContent}
      </Tooltip>
    </>
  );
};

export default UserAvatar;
