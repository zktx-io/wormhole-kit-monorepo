import { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from '@radix-ui/themes';
import { useWormhole } from '@zktx.io/wormhole-kit-core';

import { ChainIcon } from './ChainIcon';

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
  handleUnsignedTx: (unsignedTx: any) => Promise<void>;
}) => {
  const api = useWormhole();
  const [loading, setLoading] = useState<boolean>(false);
  const [target, setTarget] = useState<Chain | undefined>(undefined);
  const [targetAddress, setTargetAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const [symbol, setSymbol] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);

  const handleOpenChange = (state: boolean) => {
    setOpen(state);
    if (state) {
      setLoading(false);
      setTarget(undefined);
      setTargetAddress('');
      setAmount('');
    }
  };

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
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Transfer</Dialog.Title>
        <Dialog.Description size="1" mb="4">
          You can select target chain, paste in the taarget address.
        </Dialog.Description>
        <Flex direction="column" gap="3">
          <label>
            <Flex direction="column" width="100%">
              <Text as="div" size="1" mb="1" weight="bold">
                Target Chain
              </Text>
              <Select.Root
                disabled={loading}
                onValueChange={(select) => setTarget(select as Chain)}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Source</Select.Label>
                    <Select.Item disabled value={chain}>
                      <Flex as="span" align="center" gap="2">
                        <ChainIcon chain={chain} />
                        {chain}
                      </Flex>
                    </Select.Item>
                  </Select.Group>
                  <Select.Separator />
                  <Select.Group>
                    <Select.Label>Target</Select.Label>
                    {api
                      .supportChains()
                      .filter((item) => item !== chain)
                      .map((item, key) => {
                        return (
                          <Select.Item key={key} value={item}>
                            <Flex as="span" align="center" gap="2">
                              <ChainIcon chain={item} />
                              {item}
                            </Flex>
                          </Select.Item>
                        );
                      })}
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>
          </label>
          <label>
            <Text as="div" size="1" mb="1" weight="bold">
              Target Address
            </Text>
            <TextField.Root
              disabled={loading}
              placeholder="paste in the target addreess"
              onChange={(e) => setTargetAddress(e.target.value)}
            />
          </label>
          <label>
            <Text as="div" size="1" mb="1" weight="bold">
              Token Amount
            </Text>
            <TextField.Root
              disabled={loading}
              type="number"
              placeholder="amount"
              onChange={(e) => setAmount(e.target.value)}
            />
            <Text
              as="div"
              size="1"
              mb="1"
              align="right"
              color={Number(amount) > balance ? 'orange' : 'gray'}
            >
              {`${balance} ${symbol}`}
            </Text>
          </label>
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button
              variant="soft"
              color="gray"
              style={{
                cursor: 'pointer',
              }}
            >
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            loading={loading}
            disabled={
              !target ||
              !targetAddress ||
              !amount ||
              !address ||
              Number(amount) === 0 ||
              (!!balance && balance < Number(amount))
            }
            onClick={handleConfirm}
            style={{
              cursor: 'pointer',
            }}
          >
            Transfer
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
