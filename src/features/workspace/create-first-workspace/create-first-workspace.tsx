import { Typography, Form, message } from 'antd';

import TextInput from '@components/common/input-fields/text-input';
import './create-first-workspace.css';
import { createWorkspace } from '@services/workspace-services';
import AppButton from '@components/common/button';
import { useNavigate } from 'react-router-dom';
import { routes } from '@constants/route-constants';
import { ResponseType } from '@models/global-models';

const { Text } = Typography;

const CreateFirstWorkspace = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async ({ title }: any) => {
    try {
      const res: ResponseType = await createWorkspace({ title });
      message.success(res?.message ?? 'Successfully created workspace!');
      form.resetFields();
      navigate(routes.dashboard.path);
    } catch(error: any) {
      message.error(error?.message ?? 'Something went wrong!');
    };
  };

  return (
    <Form form={form} onFinish={onFinish} className='create-first-workspace-container'>
      <Text className='create-first-workspace-title'>Create Your Own Workspace</Text>
      <Form.Item name='title'>
        <TextInput className='create-first-workspace-input' placeholder='Workspace name' bordered={false} />
      </Form.Item>
      <AppButton htmlType='submit' className='create-first-workspace-btn'>Done</AppButton>
    </Form>
  );
};

export default CreateFirstWorkspace;