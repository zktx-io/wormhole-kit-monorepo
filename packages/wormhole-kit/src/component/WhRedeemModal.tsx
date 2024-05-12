import { useEffect, useState } from 'react';

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
} from './styles/modal';
import { useMode } from '../provider/WhProvider';

import type { Chain } from '@wormhole-foundation/sdk-connect';

export const WhRedeemModal = ({
  chain,
  address,
  open,
  setOpen,
  handleUnsignedTx,
}: {
  chain: Chain;
  address?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleUnsignedTx: (unsignedTx: any) => void;
}) => {
  const api = useWormhole();
  const { mode } = useMode();

  const [loading, setLoading] = useState<boolean>(false);
  const [source, setSource] = useState<Chain | undefined>(undefined);
  const [txHash, setTxHash] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleConfirm = async () => {
    if (address && source) {
      try {
        setLoading(true);
        const { unsignedTx, error } = await api.buildRedeemTx({
          source,
          txHash,
          receiver: {
            chain,
            address,
          },
        });
        if (error || !unsignedTx) {
          setError(error || 'build redeem transaction error');
        } else {
          handleUnsignedTx(unsignedTx);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setOpen(false);
      }
    }
  };

  useEffect(() => {
    if (open) {
      setLoading(false);
      setSource(undefined);
      setTxHash('');
      setError('');
    }
  }, [open]);

  return (
    <DlgRoot open={open} onOpenChange={setOpen}>
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
