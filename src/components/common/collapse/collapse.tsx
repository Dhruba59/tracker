import { Collapse, CollapseProps } from 'antd';
import { ReactNode } from 'react';

import './collapse.css';

interface AppCollapseProps extends CollapseProps {
  key: string;
  label: string;
  children: ReactNode;
}

const AppCollapse = ({ key, label, children, defaultActiveKey, ...rest }: AppCollapseProps) => {
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