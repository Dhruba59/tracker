
import React, { useState } from 'react';
import { Divider, Radio, Table, TableColumnProps } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { TableDataType } from '@models/members';

interface AppTableProps {
  className?: string;
  columns: ColumnsType<TableDataType>;
  data: TableDataType[];
  rowSelection: {
    onChange: (selectedRowKeys: React.Key[], selectedRows: TableDataType[]) => void;
    getCheckboxProps: (record: TableDataType) => any;
  }
}

const AppTable: React.FC<AppTableProps> = ({ className, columns, data, rowSelection }) => {
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

  return (
    <div>
      <Table
        className={className}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default AppTable;