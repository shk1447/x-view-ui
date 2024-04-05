import { Dialog } from '@vases-ui/molecules';
import React, { ReactNode, useEffect, useState } from 'react';
import ConfirmDialog from './sub/ConfirmDialog';

const CancelConfirmDialog = ({
  open,
  onClose,
  confirmDialogCondition,
  children,
}: {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  confirmDialogCondition: boolean;
}) => {
  const [mainDialogOpen, setMainDialogOpen] = useState<boolean>(open);
  const [subDialogOpen, setSubDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    setMainDialogOpen(open);
  }, [open]);

  const handleOnCancel = () => {
    setSubDialogOpen(false);
  };

  const handleOnProceed = () => {
    setSubDialogOpen(false);
    setMainDialogOpen(false);

    onClose && onClose();
  };

  return (
    <>
      <ConfirmDialog
        open={subDialogOpen}
        onCancel={handleOnCancel}
        onProceed={handleOnProceed}
      />
      <Dialog
        open={mainDialogOpen}
        onClose={(event, reason) => {
          if (reason === 'escapeKeyDown' || reason === 'backdropClick') {
            if (confirmDialogCondition) {
              setSubDialogOpen(true);
            } else {
              setMainDialogOpen(false);
              onClose && onClose();
            }
          }
        }}
      >
        <Dialog.Title>
          {React.Children.toArray(children).filter(
            (d: any) => d.type.name === CancelConfirmDialog.Title.name,
          )}
        </Dialog.Title>
        <Dialog.Description>
          {React.Children.toArray(children).filter(
            (d: any) => d.type.name === CancelConfirmDialog.Description.name,
          )}
        </Dialog.Description>
        <Dialog.Body>
          {React.Children.toArray(children).filter(
            (d: any) => d.type.name === CancelConfirmDialog.Body.name,
          )}
        </Dialog.Body>
        <Dialog.Buttons>
          {React.Children.toArray(children).filter(
            (d: any) => d.type.name === CancelConfirmDialog.Buttons.name,
          )}
        </Dialog.Buttons>
      </Dialog>
    </>
  );
};

const Title = ({ children }: { children: ReactNode }) => <div>{children}</div>;
Title.displayName = 'CancelConfirmDialog.Title';
CancelConfirmDialog.Title = Title;

const Description = ({ children }: { children: ReactNode }) => (
  <div>{children}</div>
);

Description.displayName = 'CancelConfirmDialog.Description';
CancelConfirmDialog.Description = Description;

const Body = ({ children }: { children: ReactNode }) => <div>{children}</div>;
Body.displayName = 'CancelConfirmDialog.Body';
CancelConfirmDialog.Body = Body;

const Buttons = ({ children }: { children: ReactNode }) => <>{children}</>;
Buttons.displayName = 'CancelConfirmDialog.Buttons';
CancelConfirmDialog.Buttons = Buttons;

export default CancelConfirmDialog;
