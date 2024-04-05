import _Button, { ButtonProps } from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import { grey } from '@vases-ui/theme/colors';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    vases_success: true;
    vases_primary: true;
    vases_warning: true;
    vases_alert: true;
    vases_neutral: true;
    primary: false;
    secondary: false;
    success: false;
    error: false;
    info: false;
    warning: false;
    inherit: false;
  }

  interface ButtonPropsSizeOverrides {
    small: false;
    medium: false;
    large: false;
    default: true;
    compact: true;
  }

  interface ButtonPropsVariantOverrides {
    contained: false;
    outlined: false;
    text: false;
    primary: true;
    secondary: true;
    tertiary: true;
    ghost: true;
    inline: true;
  }
}

const Button = styled(_Button)<ButtonProps>(
  ({ theme, color, variant, size }) => ({
    borderRadius: '4px',
    padding: '0px',
    textTransform: 'none',
    // "&.MuiButton-sizeDefault": {
    //   height: "40px",
    //   minWidth: "80px",
    //   padding: "10px 16px 10px 16px",
    //   fontFamily: "Noto Sans KR",
    //   fontSize: "14px", // 14 bol
    //   lineHeight: "20px", // 14 bol
    //   fontWeight: 700, // 14 bol
    //   "& .MuiButton-startIcon": {
    //     marginRight: "4px",
    //     marginLeft: "0px!important",
    //   },
    // },
    '&.MuiButton-sizeDefault': {
      height: '32px',
      minWidth: '56px',
      padding: '8px 12px 8px 12px',
      fontFamily: 'Noto Sans KR',
      fontSize: '12px', // 12 bol
      lineHeight: '16px', // 12 bol
      fontWeight: 700, // 12 bol
      '& .MuiButton-startIcon': {
        marginRight: '2px',
        marginLeft: '0px!important',
      },
    },
    '&.MuiButton-sizeCompact': {
      height: '32px',
      minWidth: '56px',
      padding: '8px 12px 8px 12px',
      fontFamily: 'Noto Sans KR',
      fontSize: '12px', // 12 bol
      lineHeight: '16px', // 12 bol
      fontWeight: 500, // 12 bol
      '& .MuiButton-startIcon': {
        marginRight: '2px',
        marginLeft: '0px!important',
      },
    },

    '&.MuiButton-primary': {
      backgroundColor: (theme.palette as any)[color as any].main,
      color: (theme.palette as any)[color as any].contrastText,
      '&:hover:not(.Mui-disabled)': {
        backgroundColor: (theme.palette as any)[color as any].dark,
      },
      '&.Mui-disabled': {
        pointerEvents: 'auto',
        color: alpha((theme.palette as any)[color as any].contrastText, 0.4),
      },
      '&.Mui-disabled:hover': {
        cursor: 'not-allowed',
      },
      '& .MuiButton-startIcon > svg': {
        fill: (theme.palette as any)[color as any].contrastText,
      },
      '&.Mui-disabled .MuiButton-startIcon > svg': {
        fill: alpha((theme.palette as any)[color as any].contrastText, 0.4),
      },
    },
    '&.MuiButton-secondary': {
      backgroundColor: (theme.palette as any)[color as any].contrastText,
      color: (theme.palette as any)[color as any].main,
      border: `1px solid ${(theme.palette as any)[color as any].main}`,
      '&:hover:not(.Mui-disabled)': {
        backgroundColor: 'rgba(125, 127, 134, 0.1)',
      },
      '&.Mui-disabled': {
        pointerEvents: 'auto',
        color: alpha((theme.palette as any)[color as any].main, 0.4),
        border: `1px solid ${alpha(
          (theme.palette as any)[color as any].main,
          0.4,
        )}`,
      },
      '&.Mui-disabled:hover': {
        cursor: 'not-allowed',
      },
      '& .MuiButton-startIcon > svg': {
        fill: (theme.palette as any)[color as any].main,
      },
      '&.Mui-disabled .MuiButton-startIcon > svg': {
        fill: alpha((theme.palette as any)[color as any].main, 0.4),
      },
    },
    '&.MuiButton-tertiary': {
      backgroundColor: (theme.palette as any)[color as any].contrastText,
      color: (theme.palette as any)[color as any].main,
      border: `1px solid ${grey[40]}`,
      '&:hover:not(.Mui-disabled)': {
        backgroundColor: 'rgba(125, 127, 134, 0.1)',
      },
      '&.Mui-disabled': {
        pointerEvents: 'auto',
        color: alpha((theme.palette as any)[color as any].main, 0.4),
        border: `1px solid ${alpha(grey[40], 0.4)}`,
      },
      '&.Mui-disabled:hover': {
        cursor: 'not-allowed',
      },
    },
    '&.MuiButton-ghost': {
      backgroundColor: 'transparent',
      color: (theme.palette as any)[color as any].main,
      fontWeight: 500,

      '&:hover:not(.Mui-disabled)': {
        backgroundColor: 'rgba(125, 127, 134, 0.1)',
      },
      '&.Mui-disabled': {
        pointerEvents: 'auto',
        color: alpha((theme.palette as any)[color as any].main, 0.4),
      },
      '&.Mui-disabled:hover': {
        cursor: 'not-allowed',
      },
    },
    '&.MuiButton-inline': {
      backgroundColor: 'transparent',
      color: (theme.palette as any)[color as any].main,

      '&:hover:not(.Mui-disabled)': {
        textDecoration: 'underline',
      },
      '&.Mui-disabled': {
        pointerEvents: 'auto',
        color: alpha((theme.palette as any)[color as any].main, 0.4),
      },
      '&.Mui-disabled:hover': {
        cursor: 'not-allowed',
      },
      '& .MuiButton-startIcon > svg': {
        fill: (theme.palette as any)[color as any].main,
      },
      '&.Mui-disabled .MuiButton-startIcon > svg': {
        fill: alpha((theme.palette as any)[color as any].main, 0.4),
      },
    },
  }),
);

Button.defaultProps = {
  color: 'vases_primary',
  variant: 'primary',
  size: 'default',
};

export default Button;
