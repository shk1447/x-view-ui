import React, { useState, useEffect } from 'react';
import { Tooltip } from '@vases-ui/atoms';
import { Box } from '@mui/material';
import MainAreaItemIcon from './Icon';
import { IconProps } from '../interfaces';

interface MainAreaItemProps extends IconProps {
  title: string;
  defaultActivate?: boolean;
  path: string;
  selected?: boolean;
}

const MainAreaItem = ({
  component,
  title,
  defaultActivate,
  style,
  viewBox,
  selected,
}: MainAreaItemProps) => {
  const [isItialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (isItialized) return;
    setIsInitialized(true);
  }, [isItialized, defaultActivate, title]);

  return (
    <MainAreaItemIcon
      component={component}
      style={style}
      viewBox={viewBox}
      data-activated={selected ? 'true' : 'false'}
    />
  );
};

export default MainAreaItem;
