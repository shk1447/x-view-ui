import { grey } from '@vases-ui/theme/colors';
import React from 'react';

interface DividerProps {
  direction?: 'horizontal' | 'vertical';
}

const Divider = (props: DividerProps) => {
  const { direction = 'horizontal' } = props;

  return (
    <div
      style={{
        width: direction == 'horizontal' ? '100%' : '1px',
        height: direction == 'horizontal' ? '1px' : '100%',
        background: grey[10],
      }}
    />
  );
};

export default Divider;
