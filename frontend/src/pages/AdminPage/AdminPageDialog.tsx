import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import React from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content?: string;
  title?: string;
  onAgree?: () => void;
  onDisagree?: () => void;
}
function AdminPageDialog({
  open,
  setOpen,
  content,
  title,
  onAgree,
  onDisagree,
}: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    onAgree?.();
    handleClose();
  };

  const handleDisagree = () => {
    onDisagree?.();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      {content && (
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {content}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleAgree}>Agree</Button>
        <Button onClick={handleDisagree}>Disagree</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AdminPageDialog;
