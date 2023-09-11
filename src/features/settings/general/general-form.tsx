import AppButton from '@components/common/button';
import TextInput from '@components/common/input-fields/text-input';
import { Button, Form, Image, Radio, Upload, UploadProps, message } from 'antd';
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
    const payload = {
      name: name.trim(),
      email: email.trim()
    };
    updateUserProfile(payload)
      .then((res: ResponseType) => message.success(res?.message ?? 'Successfully updated user.'))
      .catch((error: any) => message.error(error?.message ?? 'unable to update!'))
      .finally(() => setIsUserDataLoading(false));
  };

  // const props: UploadProps = {
  //   name: 'file',
  //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   headers: {
  //     authorization: 'authorization-text',
  //   },
  //   onChange(info: any) {
  //     console.log('file',info.file);
  //     if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === 'done') {
  //       const fileReader = new FileReader();
  //       // updateUserProfile({profile_image: info.file}).then((res: ResponseType) => {
  //       //   message.success(res?.message ?? 'Successfully updated image!'); 
  //       // }).catch((err) => console.log(err));
  //       fileReader.onload = (event: any) => {
  //         console.log('filereader', event.target);
  //         const imageDataString = event.target.result; // This is the image data as a string.
  //         console.log('image', imageDataString);
  //         console.log('image1', event.target);
  //         // Now you can send 'imageDataString' to your backend API using a separate API call.
  //       };
    
  //       // Read the file as a data URL (string).
  //       fileReader.readAsDataURL(info.file.originFileObj);
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  return (
    <Form className='general-form-container' form={form} onFinish={onSubmit} labelCol={{ span: 24 }}>
      {/* <Image
        className='general-form-image'
        width={100}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      /> */}
      {/* <Upload {...props}>
        <Button>Click to Upload</Button>
      </Upload> */}
      <Form.Item 
        name='name' 
        label='Name' 
        rules={[
          { required: true, message: 'Please enter your name.' },
          // Use a regular expression to allow only letters and spaces
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