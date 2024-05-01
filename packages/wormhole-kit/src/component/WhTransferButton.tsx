import { useState } from 'react';

import { Button } from '@radix-ui/themes';

import { WhTransferModal } from './WhTransferModal';

import type { Chain } from '@wormhole-foundation/sdk-connect';

export const WhTransferButton = ({
  transferText,
  chain,
  address,
  token,
  handleUnsignedTx,
}: {
  transferText?: string;
  chain: Chain;
  address?: string;
  token?: string;
  handleUnsignedTx: (unsignedTx: string) => Promise<void>;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <WhTransferModal
      chain={chain}
      address={address}
      token={token}
      open={open}
      setOpen={setOpen}
      trigger={
        // eslint-disable-next-line react/jsx-pascal-case
        <Button onClick={() => setOpen(true)}>
          {transferText || 'Wormhole Transfer'}
        </Button>
      }
      handleUnsignedTx={handleUnsignedTx}
    />
  );
};
