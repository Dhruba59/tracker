import { ReactNode, useState } from 'react';
import { Dropdown, MenuProps, Select, Space } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import { ArrowDown } from '@icons';
import './select-dropdown.css';
import { MEMBER_ROLE_TYPE } from '@models/members';

export interface SelectDropdownProps {
  selectOptions: BaseOptionType[];
  dropdownItems: MenuProps['items'];
  selectClassName?: string;
  dropdownClassName?: string;
  mode?: 'multiple' | 'tags';
  placeholder?: string;
  prefixIcon?: ReactNode;
  onChange: (values: any) => void;
  defaultDropDownSelect: MEMBER_ROLE_TYPE;
};

export interface SelectDropdownValueType {
  memberIds : string[];
  role: string;
}

const SelectDropdown = ({selectOptions, dropdownItems, onChange, defaultDropDownSelect, selectClassName, dropdownClassName, mode='multiple', prefixIcon, placeholder='Please select'}: SelectDropdownProps) => {
  const [values, setValues] = useState<SelectDropdownValueType>({
    memberIds: [],
    role: defaultDropDownSelect
  });

  const handleSelectChange = (memberIds: any) => {
    setValues({ ...values, memberIds });
    onChange({ ...values, memberIds });
  };

  const handleDropdown = (role: any) => {
    setValues({ ...values, role: role.key });
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
      <Dropdown menu={{ items: dropdownItems, onClick: handleDropdown, defaultValue: defaultDropDownSelect }} >
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