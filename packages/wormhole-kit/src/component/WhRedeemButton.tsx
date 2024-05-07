import { useState } from 'react';

import { Button } from '@radix-ui/themes';

import { Wormhole } from './icons/wormhole';
import { WhRedeemModal } from './WhRedeemModal';

import type { Chain } from '@wormhole-foundation/sdk-connect';

export const WhRedeemButton = ({
  size,
  buttonText,
  chain,
  address,
  handleUnsignedTx,
}: {
  size?: '1' | '2' | '3' | '4';
  buttonText?: string;
  chain: Chain;
  address?: string;
  handleUnsignedTx: (unsignedTx: any) => Promise<void>;
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
