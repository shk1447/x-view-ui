import React from 'react';
import { styled } from '@mui/material/styles';
import _TextField, { TextFieldProps } from '@mui/material/TextField';
import { useFormControl } from '@mui/material/FormControl';
import { alert, black, grey, primary, white } from '@vases-ui/theme/colors';

const StyledTextField = styled(_TextField)(
  ({ theme, error, disabled, multiline }) => {
    const style = {
      'label + &': {
        marginTop: theme.spacing(3),
      },

      '& .MuiOutlinedInput-root': {
        width: '100%',
        height: multiline ? '80px' : '32px',
        borderRadius: 4,
        position: 'relative',
        backgroundColor: white,
        border: `1px solid ${grey[40]}`,
        padding: '10px 12px',
        transition: theme.transitions.create(['border']),
        fontFamily: 'Noto Sans KR', // 14 med
        fontSize: '14px', // 14 med
        color: black, // 14 med
        lineHeight: '20px', // 14 med
        '&:not(.Mui-disabled):hover': {
          border: `1px solid ${primary[100]}`,
        },
      },

      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& .MuiOutlinedInput-input': {
        padding: 0,
      },

      '& .Mui-focused': {
        border: `1px solid ${primary[20]}`,
      },

      '& .Mui-error': {
        border: `1px solid ${alert[100]}`,
      },
      '& .Mui-disabled': {
        opacity: 0.4,
        pointerEvents: 'auto',
      },
      '& .Mui-disabled:hover': {
        cursor: 'not-allowed',
      },
    };

    return style;
  },
);

const TextField = ({ color, ...props }: TextFieldProps) => {
  const formControl = useFormControl();

  return (
    <StyledTextField
      variant="outlined"
      color="primary"
      autoComplete="off"
      error={formControl?.error}
      disabled={formControl?.disabled}
      required={formControl?.required}
      // focused는 속성을 주면 mouse interaction focus가 동작하지 않기 때문에 우선 빼둔다.
      FormHelperTextProps={{
        sx: {
          margin: 0,
          marginTop: '4px',
          border: '0px !important',
        },
      }}
      {...props}
    />
  );
};

export default TextField;
