import { Stack } from '@mui/material';
import React, { ReactNode } from 'react';
import MainAreaItem from './Item';

interface MainAreaProps {
  children: ReactNode;
}

const MainArea = ({ children }: MainAreaProps): JSX.Element => {
  return (
    <Stack
      direction="column"
      spacing="8px"
      alignItems="center"
      style={{ height: '50%' }}
      padding="0px 8px 0px 8px"
    >
      {children}
    </Stack>
  );
};

MainArea.Item = MainAreaItem;

export default MainArea;
