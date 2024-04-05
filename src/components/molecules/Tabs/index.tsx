import {
  Box,
  Tabs as _Tabs,
  Tab as _Tab,
  TabsProps as _TabsProps,
  TabProps as _TabProps,
} from '@mui/material';
import React from 'react';
import { grey } from '~/components/theme/colors';

export interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
}

export interface TabsProps extends _TabsProps {}

export interface TabProps extends _TabProps {}

export const Tabs = (props: TabsProps) => {
  return (
    <_Tabs
      sx={{
        minHeight: '32px',
        maxHeight: '32px',
        borderBottom: `1px solid ${grey[20]}`,
      }}
      {...props}
    >
      {props.children}
    </_Tabs>
  );
};

export const Tab = (props: TabProps) => {
  return (
    <_Tab
      sx={{
        textTransform: 'none',
        minHeight: '0px',
        padding: '8px 38px',
      }}
      {...props}
    />
  );
};

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ width: '100%', height: 'calc(100% - 32px)', overflow: 'hidden' }}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

export default TabPanel;
