import React from 'react';
import { useLocation } from 'react-router-dom';
import BottomAreaItemIcon from './Icon';
import { IconProps } from '../interfaces';

interface BottomAreaItemProps extends IconProps {
  title: string;
}

const BottomAreaItem = ({ component, style, viewBox }: BottomAreaItemProps) => {
  return (
    <BottomAreaItemIcon component={component} style={style} viewBox={viewBox} />
  );
};

export default BottomAreaItem;
