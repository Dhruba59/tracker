import React, { useState, ChangeEvent } from 'react';
import './file-input.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface FileInputProps {
  onChange?: (file: File | null) => void;
  label?: string;
  className?: string;
  loading?: boolean;
}

const FileInput: React.FC<FileInputProps> = ({ onChange, label, className='', loading }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file);
    if (onChange) {
      onChange(file);
    }
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className={className}>
      {selectedFile && <div className='custom-selected-file'>{selectedFile?.name}</div>}
      <label htmlFor="fileInput" className="custom-file-label">
        {/* {selectedFile ? selectedFile.name : 'Choose File'} */}
        {label ?? 'Choose file'}
        
      </label>
      {loading && <Spin indicator={antIcon} />}
      <input
        type="file"
        id="fileInput"
        accept=".jpg, .jpeg, .png"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileInput;
