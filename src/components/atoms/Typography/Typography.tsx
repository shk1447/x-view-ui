import React from 'react';
import {
  styled,
  Typography as _Typography,
  TypographyProps,
} from '@mui/material';

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title1: true;
    title2: true;
    reg12: true;
    med12: true;
    bol12: true;
    paragraph12: true;
    reg14: true;
    med14: true;
    bol14: true;
    paragraph14: true;
    reg16: true;
    med16: true;
    bol16: true;
  }
}

const StyledTypography = styled(_Typography)(({ theme }) => ({}));

const Typography = ({ children, ...props }: TypographyProps) => (
  <>
    <StyledTypography {...props}>{children}</StyledTypography>
  </>
);

export default Typography;
