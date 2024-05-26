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

export const WhTransferModal = ({
  chain,
  address,
  token,
  trigger,
  handleUnsignedTxs,
}: {
  chain: Chain;
  address?: string;
  token?: string;
  trigger: ReactElement;
  handleUnsignedTxs: (unsignedTxs: Array<IUnsignedTx>) => void;
}) => {
  const api = useWormhole();
  const { mode } = useMode();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [target, setTarget] = useState<Chain | undefined>(undefined);
  const [targetAddress, setTargetAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const [symbol, setSymbol] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const handleOpenChange = (state: boolean) => {
    const init = async () => {
      if (address) {
        setSymbol(api.getSymbol({ chain, token }));
        const { fValue, value } = await api.getBalance({
          chain,
          address,
          token,
        });
        fValue ? setBalance(fValue) : setBalance(parseInt(value));
      }
    };
    if (state) {
      setLoading(false);
      setTarget(undefined);
      setTargetAddress('');
      setAmount('');
      init();
    }
    setOpen(state);
  };

  const handleConfirm = async () => {
    if (address && target) {
      try {
        setLoading(true);
        const { unsignedTxs, error } = await api.buildTransferTx({
          sender: { chain, address },
          receiver: {
            chain: target,
            address: targetAddress,
          },
          amount,
          token,
        });
        if (error || unsignedTxs.length === 0) {
          setError(error || 'build redeem transaction error');
        } else {
          handleUnsignedTxs(unsignedTxs);
          setOpen(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <DlgRoot open={open} onOpenChange={handleOpenChange}>
      <DlgTrigger asChild>{trigger}</DlgTrigger>
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
                  onSelect={(chain) => {
                    setTarget(chain);
                    setError('');
                  }}
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
                  onChange={(e) => {
                    setTargetAddress(e.target.value);
                    setError('');
                  }}
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
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setError('');
                  }}
                />
              </FormControl>
              <FormMessage
                error={balance < Number(amount) || !!error}
                mode={mode}
              >
                {!error ? `${balance} ${symbol}` : error}
              </FormMessage>
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
                (!!balance && balance < Number(amount)) ||
                !!error
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
