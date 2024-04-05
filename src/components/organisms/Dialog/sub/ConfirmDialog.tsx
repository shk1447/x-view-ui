import React from 'react';
import { css } from '@emotion/react';
import Stack from '@mui/material/Stack';
import Button from '@vases-ui/atoms/Button';
import Typography from '@vases-ui/atoms/Typography';
import Dialog from '@vases-ui/molecules/Dialog/Dialog';

const ConfirmDialog = ({
  open,
  onCancel,
  onProceed,
}: {
  open: boolean;
  onCancel: () => void;
  onProceed: () => void;
}) => {
  return (
    <Dialog
      open={open}
      css={css`
        & .MuiDialog-paper {
          width: 360px;
        }
      `}
    >
      <Dialog.Title>
        <Typography variant="title2" lineHeight="28px">
          Close the dialog?
        </Typography>
      </Dialog.Title>

      <Dialog.Description>
        <Typography variant="paragraph14" lineHeight="16px">
          Closing this window will discard any unsaved changes. Are you sure you
          want to proceed?
        </Typography>
      </Dialog.Description>

      <Dialog.Buttons>
        <Stack gap="16px" direction="row-reverse">
          <Button color="vases_alert" variant="primary" onClick={onProceed}>
            Proceed
          </Button>
          <Button color="vases_neutral" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        </Stack>
      </Dialog.Buttons>
    </Dialog>
  );
};

export default ConfirmDialog;
