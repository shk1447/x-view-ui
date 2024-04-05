import { Stack } from '@mui/material';
import React, { ReactNode } from 'react';
import BottomArea from './Bottom/Area';
import Logo from './Logo/Logo';
import MainArea from './Main/Area';

interface MenuAreaProps {
  children: ReactNode;
}

const MenuArea = ({ children }: MenuAreaProps): JSX.Element => {
  return (
    <Stack
      direction="column"
      spacing="16px"
      alignItems="center"
      style={{
        // height: "calc(100% - 44px)",
        height: '100%',
        padding: '20px 0px 24px 0px',
      }}
    >
      {children}
    </Stack>
  );
};

MenuArea.displayName = 'MenuArea';

MenuArea.Logo = Logo;
MenuArea.MainArea = MainArea;
MenuArea.BottomArea = BottomArea;

export default MenuArea;
