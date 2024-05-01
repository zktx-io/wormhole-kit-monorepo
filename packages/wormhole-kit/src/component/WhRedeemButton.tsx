import { useState } from 'react';

import { Button, IconButton, Tooltip } from '@radix-ui/themes';

import { Wormhole } from './icons/wormhole';
import { WhRedeemModal } from './WhRedeemModal';

import type { Chain } from '@wormhole-foundation/sdk-base';

export const WhRedeemButton = ({
  icon,
  size,
  redeemText,
  chain,
  address,
  handleUnsignedTx,
}: {
  icon?: boolean;
  size?: '1' | '2' | '3' | '4';
  redeemText?: string;
  chain: Chain;
  address?: string;
  handleUnsignedTx: (unsignedTx: string) => Promise<void>;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const TITLE = 'Redeem';

  return (
    <WhRedeemModal
      open={open}
      setOpen={setOpen}
      chain={chain}
      address={address}
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
            {redeemText || TITLE}
          </Button>
        )
      }
      handleUnsignedTx={handleUnsignedTx}
    />
  );
};
