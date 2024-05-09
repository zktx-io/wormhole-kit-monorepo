import * as Select from '@radix-ui/react-select';
import { styled } from '@stitches/react';

export const SelectRoot = styled(Select.Root, {});
export const SelectValue = styled(Select.Value, {});
export const SelectPortal = styled(Select.Portal, {});
export const SelectGroup = styled(Select.Group, {});
export const SelectItemText = styled(Select.ItemText, {});

export const SelectTrigger = styled(Select.Trigger, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderRadius: '4px',
  padding: '0 15px',
  fontSize: '14px',
  lineHeight: '20px',
  height: '32px',
  gap: '5px',
  cursor: 'pointer',
  borderStyle: 'solid',
  borderWidth: '1px',
  backgroundColor: '#00000000',
  variants: {
    mode: {
      light: {
        color: '#000000',
        borderColor: '#01013740',
      },
      dark: {
        color: '#ffffff',
        borderColor: '#ddf3ff40',
      },
    },
  },
});

export const SelectContent = styled(Select.Content, {
  overflow: 'hidden',
  backgroundColor: 'white',
  borderRadius: '6px',
  variants: {
    mode: {
      light: {
        color: '#000000',
        backgroundColor: '#ffffff',
        boxShadow:
          '0 10px 38px -10px rgba(22, 23, 24, 0.35), 0 10px 20px -15px rgba(22, 23, 24, 0.2)',
      },
      dark: {
        color: '#ffffff',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#ddf3ff15',
        backgroundColor: '#191919',
        boxShadow:
          '0 10px 38px -10px rgba(0, 0, 0, 0.19), 0 10px 20px -15px rgba(0, 0, 0, 0.23)',
      },
    },
  },
});

export const SelectViewport = styled(Select.Viewport, {
  padding: '5px',
});

export const SelectItem = styled(Select.Item, {
  fontSize: '13px',
  lineHeight: 1,
  borderRadius: '3px',
  display: 'flex',
  alignItems: 'center',
  height: '25px',
  padding: '0 35px 0 25px',
  position: 'relative',
  userSelect: 'none',
  variants: {
    mode: {
      light: {
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#afafaf53',
        },
        '&:disabled': {
          cursor: 'default',
        },
      },
      dark: {
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: '#afafaf53',
        },
        '&:disabled': {
          cursor: 'default',
        },
      },
    },
  },
});

export const SelectItemIndicator = styled(Select.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: '25px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const SelectLabel = styled(Select.Label, {
  padding: '0 25px',
  fontSize: '12px',
  lineHeight: '25px',
});

export const SelectSeparator = styled(Select.Separator, {
  height: '1px',
  margin: '5px',
  variants: {
    mode: {
      light: {
        backgroundColor: '#01013725',
      },
      dark: {
        backgroundColor: '#ddf3ff25',
      },
    },
  },
});
