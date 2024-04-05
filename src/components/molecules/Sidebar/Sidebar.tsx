import Divider, { DividerProps } from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import React, { ReactNode, useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { grey, white } from '@vases-ui/theme/colors';
import SubMenuArea from './SubMenuArea/SubMenuArea';
import MenuArea from '../../molecules/Sidebar/MenuArea';

export interface SidebarProps {
  children: ReactNode;
}

export const SidebarDivider = styled(Divider)<DividerProps>(({ theme }) => ({
  borderColor: grey[20],
}));

function Router(props: { children?: React.ReactNode }) {
  const { children } = props;

  return <MemoryRouter>{children}</MemoryRouter>;
}

const Sidebar = ({ children }: SidebarProps): JSX.Element => {
  return (
    <Router>
      <div style={{ position: 'relative' }}>
        <Stack
          direction="row"
          spacing="0px"
          style={{
            height: '100%',
            backgroundColor: white,
          }}
        >
          {/* MENU AREA */}
          {React.Children.toArray(children).filter(
            (d: any) => d.type.name === Sidebar.MenuArea.name,
          )}

          <SidebarDivider orientation="vertical" flexItem />

          {/* SUBMENU AREA */}
          {React.Children.toArray(children).filter(
            (d: any) => d.type.name === Sidebar.SubMenuArea.name,
          )}
        </Stack>
      </div>
    </Router>
  );
};

Sidebar.MenuArea = MenuArea;
Sidebar.SubMenuArea = SubMenuArea;

export default Sidebar;
