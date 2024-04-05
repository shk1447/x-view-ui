import React from 'react';
import { styled } from '@mui/material/styles';
import CHECKBOX, { CheckboxProps } from '@mui/material/Checkbox';
import { grey, primary } from '@vases-ui/theme/colors';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 4,
  width: 16,
  height: 16,
  border: `1px solid ${grey[40]}`,
  boxSizing: 'border-box',
  backgroundColor: grey[5],

  'input:not(:disabled):hover ~ &': {
    border: `1px solid ${primary[100]}`,
  },

  'input:disabled ~ &': {
    pointerEvents: 'auto',
    boxShadow: 'none',
    opacity: 0.4,
  },
  'input:disabled ~ &:hover': {
    cursor: 'not-allowed',
  },
  'input:focus ~ &': {
    outline: `2px solid ${primary[20]}`,
    outlineOffset: 0,
  },
}));

const CheckedIcon = styled(BpIcon)({
  backgroundColor: primary[100],
  border: `1px solid ${primary[100]}`,

  '&:before': {
    display: 'block',
    width: 8,
    height: 7,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='7' viewBox='0 0 8 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.939634 2.72668L-0.000366211 3.66668L2.6663 6.33334L7.99963 1.00001L7.05963 0.0533447L2.6663 4.44668L0.939634 2.72668Z' fill='white'/%3E%3C/svg%3E%0A")`,
    content: '""',
    transform: 'translate(3px, 4px)',
  },
});

const IndeterminatedIcon = styled(BpIcon)({
  backgroundColor: primary[100],
  border: `1px solid ${primary[100]}`,

  '&:before': {
    display: 'block',
    width: 8,
    height: 2,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='2' viewBox='0 0 8 2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect y='0.25' width='8' height='1.5' fill='white'/%3E%3C/svg%3E%0A")`,
    content: '""',
    transform: 'translate(3px, 6px)',
  },
  'input:hover ~ &': {
    backgroundColor: `1px solid ${primary[100]}`,
  },
});

const StyledCheckbox = styled(CHECKBOX)(({ theme }) => ({
  '& .Mui-disabled span': {
    border: `1px solid ${grey[40]}`,
    backgroundColor: grey[5],
  },
}));

const Checkbox = (props: CheckboxProps) => {
  return (
    <StyledCheckbox
      {...props}
      sx={{
        '&:hover': { bgcolor: 'transparent' },
      }}
      disableRipple
      color="default"
      checkedIcon={<CheckedIcon />}
      indeterminateIcon={<IndeterminatedIcon />}
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
    />
  );
};

export default Checkbox;
