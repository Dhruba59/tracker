import { Spin } from 'antd';
import './full-page-loading.css';

interface FullPageBlurLoadingProps {
  mode?: 'screen' | 'container';
}

const FullPageBlurLoading = ({ mode = 'screen' }: FullPageBlurLoadingProps) => {
  return (
    <div className={`loading-container blur ${mode === 'screen' ? 'screen-size' : 'container-size '}`}>
      <Spin size='large' />
    </div>
  );
};

export default FullPageBlurLoading;
