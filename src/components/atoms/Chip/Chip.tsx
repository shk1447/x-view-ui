import React from 'react';
import _Chip, { ChipProps } from '@mui/material/Chip';
import { styled } from '@mui/material';
import { grey, primary } from '@vases-ui/theme/colors';

const Chip = styled(({ ...props }: ChipProps) => <_Chip {...props} />)(
  ({ theme, color }) => {
    return {
      '&': {
        height: '24px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '16px',
        padding: '4px 8px',
        background: 'transparent',
        color: 'black',
        border:
          color == 'primary'
            ? `1px solid ${primary[100]}`
            : `1px solid ${grey[20]}`,
      },
      '& .MuiChip-label': {
        padding: 0,
      },
    };
  },
);

export default Chip;
