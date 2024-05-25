// eslint-disable-next-line import/default
import React, { useState } from 'react';

import { ChainIcon } from './ChainIcon';
import {
  SelectItem as Item,
  SelectContent,
  SelectGroup,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from './styles/select';

import type { Chain } from '@zktx.io/wormhole-kit-core';

const addSpaceBeforeUpperCase = (chain: Chain) => {
  return chain.replace(/([A-Z])/g, ' $1').trim();
};

// eslint-disable-next-line import/no-named-as-default-member
const SelectItem = React.forwardRef(
  ({ chain, ...props }: any, forwardedRef: any) => {
    return (
      <Item {...props} ref={forwardedRef}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '4px',
          }}
        >
          <ChainIcon chain={chain} />
          <SelectItemText>{addSpaceBeforeUpperCase(chain)}</SelectItemText>
        </div>
      </Item>
    );
  },
);

// eslint-disable-next-line import/no-named-as-default-member
export const SelectChains = React.forwardRef(
  (
    {
      mode,
      type,
      chain,
      chains,
      disabled,
      onSelect,
    }: {
      mode: 'light' | 'dark';
      type: 'transfer' | 'redeem';
      chain: Chain;
      chains: Chain[];
      disabled: boolean;
      onSelect: (chain: Chain | undefined) => void;
    },
    forwardedRef: any,
  ) => {
    const [selectChain, setSelectChain] = useState<Chain | undefined>(
      undefined,
    );

    const handleSelect = (chain: Chain) => {
      setSelectChain(chain);
      onSelect(chain);
    };

    return (
      <SelectRoot disabled={disabled} onValueChange={handleSelect}>
        <SelectTrigger mode={mode} ref={forwardedRef}>
          <SelectValue>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '4px',
              }}
            >
              {selectChain && (
                <>
                  <ChainIcon chain={selectChain} />
                  {addSpaceBeforeUpperCase(selectChain)}
                </>
              )}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectPortal>
          <SelectContent mode={mode}>
            <SelectViewport>
              <SelectGroup>
                <SelectLabel>
                  {type === 'transfer' ? 'Source' : 'Target'}
                </SelectLabel>
              </SelectGroup>
              <SelectItem disabled value={chain} chain={chain} />
              <SelectSeparator mode={mode} />
              <SelectGroup>
                <SelectLabel>
                  {type === 'transfer' ? 'Target' : 'Source'}
                </SelectLabel>
                {chains.map((item, key) => {
                  return (
                    <SelectItem
                      key={key}
                      mode={mode}
                      value={item}
                      chain={item}
                    />
                  );
                })}
              </SelectGroup>
            </SelectViewport>
          </SelectContent>
        </SelectPortal>
      </SelectRoot>
    );
  },
);

SelectItem.displayName = 'SelectItem';
SelectChains.displayName = 'SelectChains';
