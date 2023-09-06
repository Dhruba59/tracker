import { useEffect, useState } from 'react';
import UserAvatar from '../user-avatar';
import './welcome-card.css';
import userImage from '@images/default-user-image.png';
import { getUserProfile } from '@services/user-services';
import { ResponseType } from '@models/global-models';
import { message } from 'antd';
import { greetByTime } from '@helpers/global-helpers';

const WelcomeCard = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    getUserProfile()
    .then((res: ResponseType) => setUser(res.payload))
    .catch((error: any) => console.log('unable to fetch user information'));
  }, []);

  return (
    <div className='welcome-card-container'>
      {/* <UserAvatar size='large' title='Avatar' src={userImage}/> */}
      <img src={userImage} />
      <div className='welcome-card-col-2'>
        <span className='welcome-card-title'>{greetByTime()} {user?.name}!, have a great day✨</span>
        <span className='welcome-card-subtitle'>User interaction expert | ant financial service - business group - platform department - technology department -UED</span>
      </div>
    </div>
  );
};

export default WelcomeCard;