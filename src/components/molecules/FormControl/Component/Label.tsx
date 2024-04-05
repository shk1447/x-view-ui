import React from 'react';
import { useFormControl } from '@mui/material/FormControl';
import _InputLabel, { InputLabelProps } from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import { alert, grey } from '@vases-ui/theme/colors';

const StyledLabel = styled(_InputLabel)(({ theme, error, disabled }) => ({
  display: 'flex',
  gap: '4px',
  fontFamily: 'Noto Sans KR',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '12px',
  lineHeight: '16px',
  transform: 'translate(0, -1.5px)',
  '&.Mui-error': {
    color: alert[100],
  },
  '&.Mui-disabled': {
    color: grey[80],
  },
}));

const Label = ({ children }: InputLabelProps) => {
  const formControl = useFormControl();

  return (
    <>
      {!formControl?.hiddenLabel && (
        <StyledLabel shrink disabled={formControl?.disabled}>
          {children}
        </StyledLabel>
      )}
    </>
  );
};

export default Label;
