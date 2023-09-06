import AppButton from '@components/common/button';
import TextInput from '@components/common/input-fields/text-input';
import { Form, Image, Radio, message } from 'antd';
import './general-form.css';
import { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '@services/user-services';
import { ResponseType } from '@models/global-models';

export interface UserProfileData {
  id: string
  status: number,
  name: string,
  email: string,
  is_verified: 1 | 0
};

const GeneralForm = () => {
  const [isUserDataLoading, setIsUserDataLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserProfileData>();
  const [form] = Form.useForm();

  useEffect(() => {
    getUserProfile()
      .then((res: ResponseType) => setUserData(res.payload))
      .catch((error: any) => message.error(error?.message ?? 'unable to fetch user information'));
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      name: userData?.name,
      email: userData?.email,
    });
  }, [userData]);

  const onSubmit = ({name, email}: any) => {
    setIsUserDataLoading(true);
    updateUserProfile({ name, email })
      .then((res: ResponseType) => message.success(res?.message ?? 'Successfully updated user.'))
      .catch((error: any) => message.error(error?.message ?? 'unable to update!'))
      .finally(() => setIsUserDataLoading(false));
  };

  return (
    <Form className='general-form-container' form={form} onFinish={onSubmit} labelCol={{ span: 24 }}>
      {/* <Image
        className='general-form-image'
        width={100}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      /> */}
      <Form.Item name='name' label='Name' rules={[{ required: true }]}>
        <TextInput className='general-form-input' />
      </Form.Item>
      <Form.Item name='email' label='Email' rules={[{ required: true }]}>
        <TextInput className='general-form-input' />
      </Form.Item>
      {/* <Form.Item name='name' label='Time Zone' rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value={1}>12 hours</Radio>
          <Radio value={2}>24 hours</Radio>
        </Radio.Group>
      </Form.Item> */}
      <AppButton loading={isUserDataLoading} type='primary' htmlType='submit'>Save Changes</AppButton>
    </Form>
  );
};

export default GeneralForm;