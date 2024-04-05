import React from 'react';
import _Tooltip, { TooltipProps as _TooltipProps } from '@mui/material/Tooltip';
import { styled } from '@mui/material';
import { black, grey, white } from '@vases-ui/theme/colors';

export interface TooltipProps extends _TooltipProps {
  variant?: 'info' | 'name' | 'items';
}

const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <_Tooltip {...props} classes={{ popper: className }} />
))(({ theme, variant }) => ({
  '& .MuiTooltip-tooltip':
    variant === 'name'
      ? {
          backgroundColor: black,
          color: white,
          margin: '2px !important',
          padding: '4px 6px 4px 6px',
          maxWidth: 240,
          fontFamily: 'Noto Sans KR',
          fontSize: '12px',
          fontWeight: 700,
          borderRadius: '4px',
        }
      : variant === 'info'
      ? {
          backgroundColor: white,
          color: black,
          maxWidth: 240,
          lineHeight: '18px',
          margin: '2px !important',
          padding: '8px 12px 8px 12px',
          fontWeight: 500,
          border: `1px solid ${grey[20]}`,
          borderRadius: '4px',
        }
      : {
          backgroundColor: white,
          color: black,
          maxWidth: 240,
          maxHeight: 160,
          margin: '2px !important',
          padding: '8px 12px 8px 12px',
          fontFamily: 'Noto Sans KR',
          fontSize: '14px',
          fontWeight: 500,
          overflow: 'auto',
          border: `1px solid ${grey[20]}`,
          borderRadius: '4px',
        },
}));

export default Tooltip;
