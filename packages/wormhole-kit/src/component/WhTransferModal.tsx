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

export const WhTransferModal = ({
  chain,
  address,
  token,
  open,
  setOpen,
  handleUnsignedTx,
}: {
  chain: Chain;
  address?: string;
  token?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleUnsignedTx: (unsignedTx: any) => void;
}) => {
  const api = useWormhole();
  const { mode } = useMode();

  const [loading, setLoading] = useState<boolean>(false);
  const [target, setTarget] = useState<Chain | undefined>(undefined);
  const [targetAddress, setTargetAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const [symbol, setSymbol] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);

  const handleConfirm = async () => {
    if (address && target) {
      try {
        setLoading(true);
        const tx = await api.buildTransferTx({
          sender: { chain, address },
          receiver: {
            chain: target,
            address: targetAddress,
          },
          amount,
          token,
        });
        handleUnsignedTx(tx);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setOpen(false);
      }
    }
  };

  useEffect(() => {
    const init = async () => {
      if (open && address) {
        setSymbol(api.getSymbol({ chain, token }));
        const { fValue, value } = await api.getBalance({
          chain,
          address,
          token,
        });
        fValue ? setBalance(fValue) : setBalance(parseInt(value));
      }
    };
    if (open) {
      setLoading(false);
      setTarget(undefined);
      setTargetAddress('');
      setAmount('');
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <DlgRoot open={open} onOpenChange={setOpen}>
      <DlgPortal>
        <DlgOverlay mode={mode} />
        <DlgContent mode={mode}>
          <DlgTitle mode={mode}>Transfer</DlgTitle>
          <DlgDescription mode={mode}>
            You can select target chain, paste in the taarget address.
          </DlgDescription>
          <FormRoot>
            <FormField name="target">
              <Label mode={mode} title={'Target Chain'} />
              <FormControl asChild>
                <SelectChains
                  mode={mode}
                  chain={chain}
                  chains={api.supportChains().filter((item) => item !== chain)}
                  type="redeem"
                  disabled={loading}
                  onSelect={setTarget}
                />
              </FormControl>
            </FormField>
            <FormField name="targetAddress">
              <Label mode={mode} title={'Target Address'} />
              <FormControl asChild>
                <FormInput
                  required
                  mode={mode}
                  autoComplete="off"
                  autoCorrect="off"
                  disabled={loading}
                  placeholder="paste in the target address"
                  onChange={(e) => setTargetAddress(e.target.value)}
                />
              </FormControl>
            </FormField>
            <FormField name="tokenAmount">
              <Label mode={mode} title={'Token Amount'} />
              <FormControl asChild>
                <FormInput
                  required
                  mode={mode}
                  autoComplete="off"
                  autoCorrect="off"
                  disabled={loading}
                  placeholder="amount"
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </FormControl>
              <FormMessage
                error={balance < Number(amount)}
                mode={mode}
              >{`${balance} ${symbol}`}</FormMessage>
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
              disabled={
                !target ||
                !targetAddress ||
                !address ||
                loading ||
                !amount ||
                Number(amount) === 0 ||
                (!!balance && balance < Number(amount))
              }
              onClick={handleConfirm}
            >
              Transfer
            </DlgButton>
          </div>
        </DlgContent>
      </DlgPortal>
    </DlgRoot>
  );
};
