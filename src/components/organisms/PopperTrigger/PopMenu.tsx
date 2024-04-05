import {
  Interpolation,
  Menu,
  MenuListProps,
  PopoverOrigin,
  SxProps,
  Theme,
} from '@mui/material';
import { usePopTriggerContext } from '@vases-ui/organisms/PopperTrigger';
import { grey, state } from '@vases-ui/theme/colors';
import React, {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
} from 'react';

export interface PopperMenuProps {
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  anchorEl?: null | HTMLElement;
  css?: SxProps<Theme> | undefined;
  listOptions?: Partial<MenuListProps<'ul'>> | undefined;
}

export type PopMenuHandle = {
  open: () => void;
  close: () => void;
};

const PopMenu = (props: PropsWithChildren<PopperMenuProps>) => {
  const {
    anchorEl = null,
    children,
    anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
    transformOrigin,
    css,
    listOptions,
  } = props;

  const popperTriggerContext = usePopTriggerContext();

  const open = popperTriggerContext
    ? Boolean(popperTriggerContext.anchorEl)
    : Boolean(props.anchorEl);

  const anchor = popperTriggerContext
    ? popperTriggerContext.anchorEl
    : anchorEl;

  return (
    <Menu
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      sx={{
        ...css,
        '& .MuiMenu-paper': {
          boxShadow: '0px 8px 12px rgba(42, 46, 57, 0.1)',
          borderRadius: '4px',
          border: `1px solid ${grey[40]}`,
          marginTop: '4px',
          overflow: 'auto',
        },
        '& .MuiList-root': {
          padding: '4px 0px',
        },
      }}
      MenuListProps={{
        ...listOptions,
      }}
      anchorEl={anchor}
      open={open}
      onClose={() => {
        console.log('ttt');
        popperTriggerContext?.setAnchorEl(null);
      }}
    >
      {Children.map(children, child => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            ...child.props,
            context: popperTriggerContext,
          });
        }

        return child;
      })}
    </Menu>
  );
};

export default PopMenu;
