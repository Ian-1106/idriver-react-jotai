import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'

export default function Index(props) {
  const { open, title, content, actions, body, closeDialog } = props

  return (
    <BootstrapDialog
      onClose={closeDialog}
      open={open}
    >
      <Box className="flex aic jcsb" sx={{ p: 1 }}>
        <DialogTitle sx={{ m: 0, p: 0, pl: 1 }}>
          {title}
        </DialogTitle>
        <IconButton
          onClick={closeDialog}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {
        !!body ? body :
          <>
            <DialogContent dividers>
              {content}
            </DialogContent>
            {!!actions &&
              <DialogActions>
                {actions}
              </DialogActions>
            }
          </>
      }
    </BootstrapDialog>
  )
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));