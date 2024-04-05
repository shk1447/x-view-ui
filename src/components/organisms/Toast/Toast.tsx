import {
  SnackbarKey,
  SnackbarProviderProps,
  SnackbarProvider as _SnackbarProvider,
  useSnackbar as _useSnackbar,
} from 'notistack';
import { SnackbarContent } from '@mui/material';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import React, { createContext, ReactNode, useContext } from 'react';
import IconButton from '@vases-ui/atoms/IconButton';
import _ from 'lodash';
import { grey, white } from '@vases-ui/theme/colors';
import { ReactComponent as Close } from './Assets/Close.svg';

const Toast = ({ children, ...props }: SnackbarProps) => {
  return (
    <Snackbar
      {...props}
      sx={{
        '&.MuiSnackbar-anchorOriginBottomRight': {
          bottom: '32px',
          right: '32px',
          width: '320px',
          height: '60px',
        },
      }}
    >
      {children}
    </Snackbar>
  );
};

let useSnackbarRef: any = null;

const StyledSnackbarProvider = styled((props: SnackbarProviderProps) => {
  return <_SnackbarProvider {...props} />;
})(({ theme: _ }) => {
  return {};
});

const SnackbarUtilsConfigurator = () => {
  useSnackbarRef = _useSnackbar();

  return useSnackbarRef;
};

interface CustomToastContentProps extends SnackbarProps {
  severity: 'info' | 'success' | 'warning' | 'error';
}

Toast.Content = styled(SnackbarContent)<CustomToastContentProps>(
  ({ theme, severity }) => {
    let color = '';
    let url = '';

    if (severity === 'info') {
      color = 'vases_primary';
      url = `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.99998 1.6C11.536 1.6 14.4 4.464 14.4 8C14.4 11.536 11.536 14.4 7.99998 14.4C4.46398 14.4 1.59998 11.536 1.59998 8C1.59998 4.464 4.46398 1.6 7.99998 1.6ZM8.79998 4.8C8.79998 4.36 8.43998 4 7.99998 4C7.55998 4 7.19998 4.36 7.19998 4.8C7.19998 5.24 7.55998 5.6 7.99998 5.6C8.43998 5.6 8.79998 5.24 8.79998 4.8ZM8.79998 12V7.2H7.19998V12H8.79998Z' fill='%235457D8'/%3E%3C/svg%3E%0A")`;
    } else if (severity === 'error') {
      color = 'vases_alert';
      url = `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.0001 14.4C11.5361 14.4 14.4001 11.536 14.4001 8C14.4001 4.464 11.5361 1.6 8.0001 1.6C4.4641 1.6 1.6001 4.464 1.6001 8C1.6001 11.536 4.4641 14.4 8.0001 14.4ZM8.8001 11.2C8.8001 11.64 8.4401 12 8.0001 12C7.5601 12 7.2001 11.64 7.2001 11.2C7.2001 10.76 7.5601 10.4 8.0001 10.4C8.4401 10.4 8.8001 10.76 8.8001 11.2ZM8.8001 4V8.8H7.2001V4H8.8001Z' fill='%23DC2E16'/%3E%3C/svg%3E%0A")`;
    } else if (severity === 'warning') {
      color = 'vases_warning';
      url = `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M8.86597 2C8.48107 1.33333 7.51882 1.33333 7.13392 2L1.07175 12.5C0.686846 13.1667 1.16797 14 1.93777 14H14.0621C14.8319 14 15.3131 13.1667 14.9282 12.5L8.86597 2ZM8.79997 9.5V4.7H7.19997V9.5H8.79997ZM7.99997 12.7C8.43997 12.7 8.79997 12.34 8.79997 11.9C8.79997 11.46 8.43997 11.1 7.99997 11.1C7.55997 11.1 7.19997 11.46 7.19997 11.9C7.19997 12.34 7.55997 12.7 7.99997 12.7Z' fill='%23F8B70F'/%3E%3C/svg%3E%0A")`;
    } else {
      color = 'vases_success';
      url = `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.99992 14.6667C4.31992 14.6627 1.33725 11.6801 1.33325 8.00006V7.86673C1.40659 4.2034 4.42325 1.2854 8.08659 1.3334C11.7513 1.38273 14.6893 4.3794 14.6653 8.0434C14.6413 11.7081 11.6646 14.6667 7.99992 14.6667ZM4.93992 7.72673L3.99992 8.66673L6.66659 11.3334L11.9999 6.00006L11.0599 5.0534L6.66659 9.44673L4.93992 7.72673Z' fill='%238FD015'/%3E%3C/svg%3E%0A")`;
    }

    const style = {
      '&.MuiSnackbarContent-root': {
        padding: 0,
        backgroundColor: white,
        boxShadow: 'none',
        outline: `1px solid ${grey[20]}`,

        flexWrap: 'nowrap',
        height: '100%',
      },
      '& .MuiSnackbarContent-message': {
        display: 'flex',
        gap: '8px',
        flexGrow: 2,
      },
      '& .MuiSnackbarContent-message:nth-of-type(1):before': {
        display: 'block',
        backgroundImage: url,
        content: '""',
        width: '16px',
        height: '16px',
        marginLeft: '12px',
      },
      '&:before': {
        display: 'block',
        width: '4px!important',
        height: '60px',
        content: "''",
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        backgroundColor: (theme.palette as any)[color as any].main,
      },
      '& .MuiSnackbarContent-action': {
        height: '100%',
        flexDirection: 'column',
        marginTop: '0px',
        marginRight: '8px',
        paddingLeft: '0px',
        marginLeft: '0px',
      },
    };

    return style;
  },
);

Toast.Content.defaultProps = {
  severity: 'info',
};

const useSnackbar = () => {
  // ref가 비어있음
  const { enqueueSnackbar: _enqueueSnackbar, closeSnackbar: _closeSnackbar } =
    _useSnackbar();

  const closeSnackbar = (key?: SnackbarKey) => {
    _closeSnackbar(key);
  };

  const enqueueSnackbar = (
    variant: 'error' | 'warning' | 'info' | 'success',
    message: React.ReactNode,
  ): SnackbarKey => {
    const handleClose = () => {
      _closeSnackbar(snackbarKey);
    };

    const snackbarKey = _enqueueSnackbar(
      <Toast.Content
        severity={variant}
        message={message}
        action={
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        }
      />,
      { persist: false },
    );

    return snackbarKey;
  };

  return {
    enqueueSnackbar: enqueueSnackbar,
    closeSnackbar: closeSnackbar,
  };
};

const SnackbarProvider = (props: SnackbarProviderProps) => {
  return (
    <StyledSnackbarProvider
      sx={{
        '&.SnackbarItem-contentRoot': {
          backgroundColor: 'transparent',
          border: 0,
          borderRadius: '4px',
          borderColor: 'white',
          color: 'black',
          padding: '0px',
        },
        '& .SnackbarItem-message': {
          width: '100%',
          height: '100%',
          padding: '0px',
        },
      }}
      {...props}
    >
      {/* 필요하면 Context로 사용해야 할듯... <StyledSnackbarProvider/> */}
      {props.children}
    </StyledSnackbarProvider>
  );
};

export { Toast, SnackbarProvider, useSnackbar };

export default Toast;
