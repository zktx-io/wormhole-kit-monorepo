import { useState } from 'react';

import { Button } from '@radix-ui/themes';

import { WhRedeemModal } from './WhRedeemModal';

import type { Chain } from '@wormhole-foundation/sdk-connect';

export const WhRedeemButton = ({
  redeemText,
  chain,
  address,
  handleUnsignedTx,
}: {
  redeemText?: string;
  chain: Chain;
  address?: string;
  handleUnsignedTx: (unsignedTx: string) => Promise<void>;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <WhRedeemModal
      open={open}
      setOpen={setOpen}
      chain={chain}
      address={address}
      trigger={
        // eslint-disable-next-line react/jsx-pascal-case
        <Button onClick={() => setOpen(true)}>
          {redeemText || 'Wormhole Redeem'}
        </Button>
      }
      handleUnsignedTx={handleUnsignedTx}
    />
  );
};
