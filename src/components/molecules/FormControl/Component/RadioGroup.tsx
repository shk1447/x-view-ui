import React from 'react';
import RADIO, { RadioProps } from '@mui/material/Radio';
import { styled, useTheme } from '@mui/material/styles';
import RADIOGROUP, { RadioGroupProps } from '@mui/material/RadioGroup';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import { grey, primary, white } from '@vases-ui/theme/colors';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  border: `1px solid ${grey[40]}`,
  width: 16,
  height: 16,
  boxSizing: 'border-box',
  backgroundColor: white,
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:not(:disabled):hover ~ &': {
    border: `1px solid ${primary[100]}`,
  },
  'input:focus ~ &': {
    outline: `2px solid ${primary[20]}`,
    outlineOffset: 0,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    pointerEvents: 'auto',
    border: `1px solid ${grey[40]}`,
    backgroundColor: grey[5],
  },
  'input:disabled ~ &:hover': {
    cursor: 'not-allowed',
  },
  'input:checked:hover ~ &': {
    backgroundColor: 'rgba(125, 127, 134, 0.1)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: white,
  border: `1px solid ${primary[100]}`,
  'input + &': {
    '&:before': {
      display: 'block',
      width: 8,
      height: 8,
      fill: primary[100],
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='4' cy='4' r='4' fill='${encodeURIComponent(
        primary[100],
      )}'/%3E%3C/svg%3E%0A")`,
      content: '""',
      transform: 'translate(40%, 35%)',
    },
  },
  'input:disabled + &': {
    '&:before': {
      display: 'block',
      width: 8,
      height: 8,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='4' cy='4' r='4' fill='${encodeURIComponent(
        grey[40],
      )}'/%3E%3C/svg%3E%0A")`,
      content: '""',
      transform: 'translate(40%, 35%)',
    },
  },
});

const BpRadio = (props: RadioProps) => {
  return (
    <RADIO
      disableRipple
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
};

const RadioGroup = ({ children, ...props }: RadioGroupProps) => {
  const theme = useTheme();

  return (
    <RADIOGROUP
      sx={{
        'label + &': {
          marginTop: theme.spacing(3),
        },
        gap: '8px',
      }}
      {...props}
    >
      {children}
    </RADIOGROUP>
  );
};

type CustomFormControlProps = Omit<FormControlLabelProps, 'control'>;

const Radio = (props: CustomFormControlProps) => {
  return <FormControlLabel {...props} control={<BpRadio />} />;
};

RadioGroup.Radio = Radio;

export default RadioGroup;
