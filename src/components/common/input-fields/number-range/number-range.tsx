import React from 'react';
import { InputNumber, Row, Col } from 'antd';

interface NumberRangeSelectorProps {
  value: [number, number];
  onChange: (newRange: [number, number]) => void;
}

function NumberRangeSelector(props: any) {
  const handleMinInputChange = (minValue: number | undefined) => {
    if (minValue !== undefined) {
      const newRange = [minValue, props.value[1]];
      props.onChange(newRange);
    }
  };

  const handleMaxInputChange = (maxValue: number | undefined) => {
    if (maxValue !== undefined) {
      const newRange = [props.value[0], maxValue];
      props.onChange(newRange);
    }
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <InputNumber
            min={0}
            max={props.value[1]}
            style={{ width: '100%', border: '1px solid #d9d9d9', borderRadius: '4px' }}
            value={props.value[0]}
            onChange={handleMinInputChange}
          />
        </Col>
        <Col span={12}>
          <InputNumber
            min={props.value[0]}
            max={100}
            style={{ width: '100%', border: '1px solid #d9d9d9', borderRadius: '4px' }}
            value={props.value[1]}
            onChange={handleMaxInputChange}
          />
        </Col>
      </Row>
    </div>
  );
}

export default NumberRangeSelector;
