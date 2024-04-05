import { Stack } from '@mui/material';
import MUIDialog, { DialogProps } from '@mui/material/Dialog';
import React from 'react';
import { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { white } from '@vases-ui/theme/colors';

const Container = styled('div')(({ theme }) => ({
  // padding: "32px",
  // backgroundColor: white,
})) as any;

interface CustomDialogProps extends DialogProps {
  children: ReactNode;
  open: boolean;
}

const Dialog = (props: CustomDialogProps): JSX.Element => {
  const { children, open } = props;

  return (
    <MUIDialog
      {...props}
      open={open}
      sx={{
        '& .MuiDialog-paper': {
          padding: '32px',
          backgroundColor: white,
          width: '400px',
        },
      }}
    >
      <Stack sx={{ height: '100%', gap: '40px' }}>
        <Stack gap="24px" sx={{ flex: 1 }}>
          {React.Children.toArray(children).filter(
            (d: any) =>
              d.type.name === Dialog.Body.name ||
              d.type.name === Dialog.Description.name ||
              d.type.name === Dialog.Title.name,
          )}
        </Stack>
        <div>
          {React.Children.toArray(children).filter(
            (d: any) => d.type.name === Dialog.Buttons.name,
          )}
        </div>
      </Stack>
    </MUIDialog>
  );
};

interface AreaProps {
  children: ReactNode;
}

const Title = ({ children }: AreaProps) => <div>{children}</div>;
Title.displayName = 'Title';
Dialog.Title = Title;

const Description = ({ children }: AreaProps) => <div>{children}</div>;
Description.displayName = 'Description';
Dialog.Description = Description;

const Body = ({ children }: AreaProps) => <div>{children}</div>;
Body.displayName = 'Body';
Dialog.Body = Body;

const Buttons = ({ children }: AreaProps) => <>{children}</>;
Buttons.displayName = 'Buttons';
Dialog.Buttons = Buttons;

export default Dialog;
