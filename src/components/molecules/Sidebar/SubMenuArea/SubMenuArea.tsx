import { Collapse, Stack } from '@mui/material';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { grey } from '@vases-ui/theme/colors';
import SubMenu from './Menu/Area';
import SubMenuTitleArea from './Title/Area';
import { ReactComponent as ArrowIcon } from '../Assets/arrow.svg';
import { SidebarDivider } from '../Sidebar';

interface SubMenuAreaProps {
  children: ReactNode;
  parentSelected: boolean;
}

const SubMenuArea = ({ children, parentSelected }: SubMenuAreaProps) => {
  return (
    <>
      <Collapse in={parentSelected ? true : false} orientation="horizontal">
        <Stack
          style={{
            height: 'calc(100% - 28px)',
            width: '224px',
            padding: '28px 8px 0px 8px',
          }}
          gap="32px"
          alignItems="center"
        >
          {children}
        </Stack>
      </Collapse>
      {parentSelected ? (
        <>
          <div
            style={{
              position: 'absolute',
              width: '16px',
              height: '32px',
              top: '28px',
              right: '0px',
              backgroundColor: grey[5],
              borderRadius: '4px 0px 0px 4px',
              display: 'inline-flex',
              flexDirection: 'column',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ArrowIcon />
          </div>
          <SidebarDivider orientation="vertical" flexItem />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

SubMenuArea.displayName = 'SubMenuArea';

SubMenuArea.MenuArea = SubMenu;
SubMenuArea.TitleArea = SubMenuTitleArea;

export default SubMenuArea;
