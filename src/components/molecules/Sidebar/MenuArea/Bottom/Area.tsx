import { Stack } from '@mui/material';
import React, { ReactNode } from 'react';
import BottomAreaItem from './Item';

interface BottomAreaProps {
  children: ReactNode;
}

const BottomArea = ({ children }: BottomAreaProps) => {
  return (
    <Stack
      direction="column-reverse"
      spacing="12px"
      alignItems="center"
      style={{ height: '50%' }}
      padding="0px 12px 0px 12px"
    >
      {children}
    </Stack>
  );
};

BottomArea.Item = BottomAreaItem;

export default BottomArea;
