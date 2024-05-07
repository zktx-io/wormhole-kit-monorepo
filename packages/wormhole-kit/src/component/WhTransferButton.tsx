import { useState } from 'react';

import { Button } from '@radix-ui/themes';

import { Wormhole } from './icons/wormhole';
import { WhTransferModal } from './WhTransferModal';

import type { Chain } from '@wormhole-foundation/sdk-connect';

export const WhTransferButton = ({
  size,
  buttonText,
  chain,
  address,
  token,
  handleUnsignedTx,
}: {
  size?: '1' | '2' | '3' | '4';
  buttonText?: string;
  chain: Chain;
  address?: string;
  token?: string;
  handleUnsignedTx: (unsignedTx: any) => Promise<void>;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const TITLE = 'Transfer';

  return (
    <WhTransferModal
      chain={chain}
      address={address}
      token={token}
      open={open}
      setOpen={setOpen}
      trigger={
        <Button
          size={size}
          onClick={() => setOpen(true)}
          style={{
            cursor: 'pointer',
          }}
        >
          <Wormhole />
          {buttonText || TITLE}
        </Button>
      }
      handleUnsignedTx={handleUnsignedTx}
    />
  );
};
