import { Collapse, CollapseProps, Typography } from 'antd';
import { ReactNode } from 'react';

import './collapse.css';
import { EditIcon } from '@icons';

interface AppCollapseProps extends CollapseProps {
  key: string;
  label?: string | ReactNode;
  children: ReactNode;
}

const AppCollapse = ({ key, children, label, defaultActiveKey, ...rest }: AppCollapseProps) => {
  
  return (
    <Collapse
      defaultActiveKey={defaultActiveKey}
      className='app-collapse'
      bordered={false}
      items={[{key, label, children}]}
      {...rest}
  />
  );
};
export default AppCollapse;