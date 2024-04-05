import { styled } from '@mui/material/styles';
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { brand, grey } from '@vases-ui/theme/colors';

interface SubMenuItemProps {
  title: string;
  selected: boolean;
}

const Item = styled('div')(({ theme }) => ({
  width: '208px',
  height: '44px',
  display: 'flex',
  borderRadius: 4,
  padding: '0px 12px',
  fontStyle: 'normal',
  alignItems: 'center',
  fontWeight: 500,
  fontFamily: 'Noto Sans KR',
  fontSize: '14px',
  lineHeight: '20px',
  boxSizing: 'border-box',
  color: grey[80],
  cursor: 'pointer',
  "&[data-selected='false']:hover": {
    backgroundColor: 'rgba(125, 127, 134, 0.1)',
  },
  "&[data-selected='true']": {
    backgroundColor: 'rgba(230, 136, 64, 0.1)',
    color: brand.orange,
  },
  "&[data-selected='false']": {
    backgroundColor: '#ffffff',
  },
}));

const SubMenuItem = ({ title, selected }: SubMenuItemProps) => {
  return <Item data-selected={selected ? 'true' : 'false'}>{title}</Item>;
};

export default SubMenuItem;
