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

import type { Chain } from '@wormhole-foundation/sdk-base';

export const WhRedeemModal = ({
  chain,
  address,
  open,
  setOpen,
  trigger,
  handleUnsignedTx,
}: {
  chain: Chain;
  address?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger: ReactElement;
  handleUnsignedTx: (unsignedTx: string) => Promise<void>;
}) => {
  const api = useWormhole();
  const [loading, setLoading] = useState<boolean>(false);
  const [source, setSource] = useState<Chain | undefined>(undefined);
  const [txHash, setTxHash] = useState<string>('');

  const handleOpenChange = (state: boolean) => {
    setOpen(state);
    if (state) {
      setLoading(false);
      setSource(undefined);
      setTxHash('');
    }
  };

  const handleConfirm = async () => {
    if (address && source) {
      try {
        setLoading(true);
        const tx = await api.buildRedeemTx({
          source,
          txHash,
          receiver: {
            chain,
            address,
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
        <Dialog.Title>Redeem</Dialog.Title>
        <Dialog.Description size="1" mb="4">
          You can select source chain and paste in the Source chain Transaction
          ID.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="1" mb="1" weight="bold">
              Source Chain
            </Text>
            <Flex direction="column" width="100%">
              <Select.Root
                onValueChange={(select) => setSource(select as Chain)}
              >
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Label>Target - {chain}</Select.Label>
                  </Select.Group>
                  <Select.Separator />
                  <Select.Group>
                    <Select.Label>Source</Select.Label>
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
              Transaction ID
            </Text>
            <TextField.Root
              placeholder="Paste in the Transaction ID"
              onChange={(e) => setTxHash(e.target.value)}
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
              disabled={!source || !txHash}
              onClick={handleConfirm}
              style={{
                cursor: 'pointer',
              }}
            >
              Redeem
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
