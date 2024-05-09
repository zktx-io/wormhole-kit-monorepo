import * as Dialog from '@radix-ui/react-dialog';
import { keyframes, styled } from '@stitches/react';

export const DlgRoot = styled(Dialog.Root, {});
export const DlgPortal = styled(Dialog.Portal, {});
export const DlgClose = styled(Dialog.Close, {});

const overlayShow = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

const contentShow = keyframes({
  from: {
    opacity: 0,
    transform: 'translate(-50%, -48%) scale(0.96)',
  },
  to: {
    opacity: 1,
    transform: 'translate(-50%, -50%) scale(1)',
  },
});

export const DlgOverlay = styled(Dialog.Overlay, {
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  variants: {
    mode: {
      light: {
        backgroundColor: '#00000066',
      },
      dark: {
        backgroundColor: '#00000099',
      },
    },
  },
});

export const DlgContent = styled(Dialog.DialogContent, {
  borderRadius: '6px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: '25px',
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  variants: {
    mode: {
      light: {
        backgroundColor: '#ffffff',
        boxShadow:
          '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
      },
      dark: {
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#ddf3ff15',
        backgroundColor: '#191919',
        boxShadow:
          '0 10px 20px rgba(54, 58, 63, 0.1), 0 6px 6px rgba(54, 58, 63, 0.14)',
      },
    },
  },
});

export const DlgTitle = styled(Dialog.DialogTitle, {
  margin: 0,
  fontWeight: 700,
  fontSize: '20px',
  variants: {
    mode: {
      light: {
        color: '#000000',
      },
      dark: {
        color: '#ffffff',
      },
    },
  },
});

export const DlgDescription = styled(Dialog.DialogDescription, {
  margin: '10px 0 16px',
  opacity: 0.7,
  fontSize: '12px',
  lineHeight: '1.5',
  variants: {
    mode: {
      light: {
        color: '#000000',
      },
      dark: {
        color: '#ffffff',
      },
    },
  },
});

export const DlgButton = styled('button', {
  height: '32px',
  paddingLeft: '12px',
  paddingRight: '12px',
  fontWeight: 500,
  fontSize: '14px',
  outline: 'none',
  borderRadius: '4px',
  border: 'none',
  variants: {
    mode: {
      light: {
        color: '#0005119e',
        backgroundColor: '#0101370f',
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#afafaf8a',
        },
        '&:disabled': {
          cursor: 'default',
          color: '#00082f46',
          backgroundColor: '#0101370f',
        },
      },
      dark: {
        color: '#f1f7ffb5',
        backgroundColor: '#deeeff14',
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#afafaf8a',
        },
        '&:disabled': {
          cursor: 'default',
          color: '#daf0ff5c',
          backgroundColor: '#deeeff14',
        },
      },
    },
  },
});
