import { Form, Image, message } from 'antd';
import { useEffect, useState } from 'react';

import AppButton from '@components/common/button';
import TextInput from '@components/common/input-fields/text-input';
import { updateUserProfile } from '@services/user-services';
import { ResponseType } from '@models/global-models';
import FileInput from '@components/common/input-fields/file-input';
import { useUserContext } from '@contexts/user-context';
import './general-form.css';

const GeneralForm = () => {
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [isUserDataLoading, setIsUserDataLoading] = useState<boolean>(false);
  const {user, setUser} = useUserContext();
  const [form] = Form.useForm();

  const onFileUpload = async (file: File | null) => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append('profile_image', file);
    try {
      setIsImageUploading(true);
      const response: ResponseType = await updateUserProfile(formData);
      setUser(response?.payload);
      setUser({
        ...user,
        profile_image_url: response?.payload.profile_image_url,
      });
      message.success(response?.message ?? 'Failed to upload image!');
    } catch(error: any) {
      message.error(error?.message ?? 'Failed to upload image!');
    } finally {
      setIsImageUploading(false);
    }
  };

  const onSubmit = ({name, email}: any) => {
    setIsUserDataLoading(true);
    const payload = {
      name: name?.trim(),
      email: email?.trim()
    };
    updateUserProfile(payload)
      .then((res: ResponseType) => {
        message.success(res?.message ?? 'Successfully updated user.');
        setUser({
          ...user,
          name: res?.payload.name,
          email: res?.payload.email
        });
      })
      .catch((error: any) => message.error(error?.message ?? 'unable to update!'))
      .finally(() => setIsUserDataLoading(false));
  };

  useEffect(() => {
    form.setFieldsValue({
      name: user?.name,
      email: user?.email,
    });
  }, [user]);

  return (
    <Form className='general-form-container' form={form} onFinish={onSubmit} labelCol={{ span: 24 }}>
      {user?.profile_image_url && <Image
        className='general-form-image'
        width={100}
        src={user?.profile_image_url}
      />}
      <FileInput onChange={onFileUpload} loading={isImageUploading} className='general-form-file-input'/>
      <Form.Item 
        name='name' 
        label='Name' 
        rules={[
          { required: true, message: 'Please enter your name.' },
          { pattern: /^[a-zA-Z][a-zA-Z0-9\s]*$/, message: 'Please enter a valid name.' },
        ]}>
        <TextInput className='general-form-input' />
      </Form.Item>
      <Form.Item 
        name='email' 
        label='Email' 
        rules={[
          { required: true, message: 'Please enter your email.' }, 
          { type: 'email', message: 'Please enter valid email.', }]}>
        <TextInput className='general-form-input' />
      </Form.Item>
      {/*
      // TODO 
      <Form.Item name='name' label='Time Zone' rules={[{ required: true }]}>
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