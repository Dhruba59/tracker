import { ReactNode, useState } from 'react';
import { Dropdown, MenuProps, Select, Space } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import { ArrowDown } from '@icons';
import './select-dropdown.css';

export interface SelectDropdownProps {
  selectOptions: BaseOptionType[];
  dropdownItems: MenuProps['items'];
  selectClassName?: string;
  dropdownClassName?: string;
  mode?: 'multiple' | 'tags';
  placeholder?: string;
  prefixIcon?: ReactNode;
  onChange: (values: any) => void;
};

export interface SelectDropdownValueType {
  memberIds : string[];
  role: string;
}

const SelectDropdown = ({selectOptions, dropdownItems, onChange, selectClassName, dropdownClassName, mode='multiple', prefixIcon, placeholder='Please select'}: SelectDropdownProps) => {
  const [values, setValues] = useState<SelectDropdownValueType>({
    memberIds: [],
    role: 'admin'
  });

  const handleSelectChange = (memberIds: any) => {
    setValues({ ...values, memberIds });
    onChange({ ...values, memberIds });
  };

  const handleDropdown = (role: any) => {
    console.log(role);
    setValues({ ...values, role });
    onChange({ ...values, role: role.key });
  };

  return (
    <div className='multiple-select-container'>
      <Select
        className={`${selectClassName} multiple-select-input`}
        mode={mode}
        allowClear
        suffixIcon={null}
        style={{ width: '100%' }}
        placeholder={<div className='multiplce-select-placeholder'>{prefixIcon} {placeholder}</div>}
        // defaultValue={['a10', 'c12']}
        onChange={handleSelectChange}
        options={selectOptions}
        // onSelect={handleOnSelect}
        children={<div>Hello world</div>}
      />
      <Dropdown menu={{ items: dropdownItems, onClick: handleDropdown }} >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {values.role}
            <ArrowDown />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default SelectDropdown;