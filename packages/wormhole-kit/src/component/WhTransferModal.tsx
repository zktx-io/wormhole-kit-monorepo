import { useState } from 'react';
import type { ReactElement } from 'react';

import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from '@radix-ui/themes';

import { ChainIcon } from './ChainIcon';
import { useWormhole } from '../provider/WormholeProvider';

import type { Chain } from '@wormhole-foundation/sdk-connect';

export const WhTransferModal = ({
  chain,
  address,
  token,
  maxAmount,
  open,
  setOpen,
  trigger,
  handleUnsignedTx,
}: {
  chain: Chain;
  address?: string;
  token?: string;
  maxAmount?: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger: ReactElement;
  handleUnsignedTx: (unsignedTx: string) => Promise<void>;
}) => {
  const api = useWormhole();
  const [loading, setLoading] = useState<boolean>(false);
  const [target, setTarget] = useState<Chain | undefined>(undefined);
  const [targetAddress, setTargetAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

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
          token: {
            amount,
          },
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

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
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
                onValueChange={(select) => setTarget(select as Chain)}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Source - {chain}</Select.Label>
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
              placeholder="Paste in the target addreess"
              onChange={(e) => setTargetAddress(e.target.value)}
            />
          </label>
          <label>
            <Text as="div" size="1" mb="1" weight="bold">
              {`Token Amount (${token ? `${token}` : 'native token'})`}
            </Text>
            <TextField.Root
              type="number"
              placeholder="amount"
              onChange={(e) => setAmount(e.target.value)}
            />
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
          <Dialog.Close>
            <Button
              loading={loading}
              disabled={
                !target ||
                !targetAddress ||
                !amount ||
                !address ||
                (!!maxAmount && maxAmount < Number(amount))
              }
              onClick={handleConfirm}
              style={{
                cursor: 'pointer',
              }}
            >
              Transfer
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
