import { useState } from 'react';
import type { ReactElement } from 'react';

import { useWormhole } from '@zktx.io/wormhole-kit-core';

import { SelectChains } from './SelectChains';
import {
  FormControl,
  FormField,
  FormInput,
  FormMessage,
  FormRoot,
} from './styles/form';
import { Label } from './styles/label';
import {
  DlgButton,
  DlgClose,
  DlgContent,
  DlgDescription,
  DlgOverlay,
  DlgPortal,
  DlgRoot,
  DlgTitle,
  DlgTrigger,
} from './styles/modal';
import { useMode } from '../provider/WhProvider';

import type { Chain, IUnsignedTx } from '@zktx.io/wormhole-kit-core';

export const WhRedeemModal = ({
  chain,
  address,
  trigger,
  handleUnsignedTxs,
}: {
  chain: Chain;
  address?: string;
  trigger: ReactElement;
  handleUnsignedTxs: (unsignedTxs: Array<IUnsignedTx>) => void;
}) => {
  const api = useWormhole();
  const { mode } = useMode();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [source, setSource] = useState<Chain | undefined>(undefined);
  const [txHash, setTxHash] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleOpenChange = (state: boolean) => {
    if (state) {
      setLoading(false);
      setSource(undefined);
      setTxHash('');
      setError('');
    }
    setOpen(state);
  };

  const handleConfirm = async () => {
    if (address && source) {
      setLoading(true);
      const { unsignedTxs, error } = await api.buildRedeemTx({
        source,
        txHash,
        receiver: {
          chain,
          address,
        },
      });
      setLoading(false);
      if (error || unsignedTxs.length === 0) {
        setError(error || 'build redeem transaction error');
      } else {
        handleUnsignedTxs(unsignedTxs);
        setOpen(false);
      }
    }
  };

  return (
    <DlgRoot open={open} onOpenChange={handleOpenChange}>
      <DlgTrigger asChild>{trigger}</DlgTrigger>
      <DlgPortal>
        <DlgOverlay mode={mode} />
        <DlgContent mode={mode}>
          <DlgTitle mode={mode}>Redeem</DlgTitle>
          <DlgDescription mode={mode}>
            You can select source chain and paste in the Source chain
            Transaction ID.
          </DlgDescription>
          <FormRoot>
            <FormField name="source ">
              <Label mode={mode} title={'Source Chain'} />
              <FormControl asChild>
                <SelectChains
                  mode={mode}
                  chain={chain}
                  chains={api.supportChains().filter((item) => item !== chain)}
                  type="redeem"
                  disabled={loading}
                  onSelect={setSource}
                />
              </FormControl>
            </FormField>
            <FormField name="txHash">
              <Label mode={mode} title={'Transaction ID'} />
              <FormControl asChild>
                <FormInput
                  required
                  autoComplete="off"
                  autoCorrect="off"
                  mode={mode}
                  disabled={loading}
                  placeholder="paste in the transaction ID"
                  onChange={(e) => setTxHash(e.target.value)}
                />
              </FormControl>
              {!!error && (
                <FormMessage error mode={mode}>
                  {error}
                </FormMessage>
              )}
            </FormField>
          </FormRoot>
          <div
            style={{
              display: 'flex',
              marginTop: 16,
              justifyContent: 'flex-end',
              gap: '12px',
            }}
          >
            <DlgClose asChild>
              <DlgButton mode={mode}>Cancel</DlgButton>
            </DlgClose>
            <DlgButton
              mode={mode}
              disabled={!source || !txHash || !!error || loading}
              onClick={handleConfirm}
            >
              Redeem
            </DlgButton>
          </div>
        </DlgContent>
      </DlgPortal>
    </DlgRoot>
  );
};
