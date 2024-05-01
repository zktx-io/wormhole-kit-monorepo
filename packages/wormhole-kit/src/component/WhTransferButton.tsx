import { useState } from 'react';

import { Button, IconButton, Tooltip } from '@radix-ui/themes';

import { Wormhole } from './icons/wormhole';
import { WhTransferModal } from './WhTransferModal';

import type { Chain } from '@wormhole-foundation/sdk-connect';

export const WhTransferButton = ({
  icon,
  size,
  transferText,
  chain,
  address,
  token,
  maxAmount,
  handleUnsignedTx,
}: {
  icon?: boolean;
  size?: '1' | '2' | '3' | '4';
  transferText?: string;
  chain: Chain;
  address?: string;
  token?: string;
  maxAmount?: number;
  handleUnsignedTx: (unsignedTx: string) => Promise<void>;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const TITLE = 'Transfer';

  return (
    <WhTransferModal
      chain={chain}
      address={address}
      token={token}
      maxAmount={maxAmount}
      open={open}
      setOpen={setOpen}
      trigger={
        icon ? (
          <Tooltip content={TITLE}>
            <IconButton
              size={size}
              onClick={() => setOpen(true)}
              radius="full"
              style={{
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <Wormhole />
            </IconButton>
          </Tooltip>
        ) : (
          <Button
            size={size}
            onClick={() => setOpen(true)}
            style={{
              cursor: 'pointer',
            }}
          >
            <Wormhole />
            {transferText || TITLE}
          </Button>
        )
      }
      handleUnsignedTx={handleUnsignedTx}
    />
  );
};
