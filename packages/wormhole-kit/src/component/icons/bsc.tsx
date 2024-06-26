import * as React from 'react';

import type { IconProps } from './types';

export const Bsc = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
      >
        <path
          d="M20.302 0 9.68 6.127l3.906 2.263 6.717-3.863L27.02 8.39l3.906-2.263L20.303 0ZM27.02 11.59l3.906 2.264v4.527l-6.718 3.863v7.727l-3.905 2.263-3.906-2.263v-7.727L9.679 18.38v-4.527l3.906-2.264 6.717 3.864 6.718-3.864Z"
          fill="#F0B90B"
        />
        <path
          d="M30.926 21.58v4.527l-3.906 2.264v-4.527l3.906-2.264Z"
          fill="#F0B90B"
        />
        <path
          d="m26.981 31.57 6.718-3.863V19.98l3.906-2.263v12.254l-10.624 6.127V31.57ZM33.7 12.254 29.792 9.99 33.7 7.727l3.906 2.263v4.527l-3.906 2.264v-4.527ZM16.397 37.737V33.21l3.905 2.263 3.906-2.263v4.527L20.303 40l-3.906-2.263ZM13.585 28.37l-3.906-2.263v-4.526l3.906 2.263v4.527ZM20.302 12.254 16.397 9.99l3.905-2.263 3.906 2.263-3.905 2.264ZM10.812 9.99l-3.906 2.264v4.527L3 14.517V9.99l3.906-2.263 3.906 2.263Z"
          fill="#F0B90B"
        />
        <path
          d="m3 17.717 3.906 2.264v7.726l6.718 3.864v4.527L3 29.97V17.717Z"
          fill="#F0B90B"
        />
      </svg>
    );
  },
);

Bsc.displayName = 'Bsc';

export default Bsc;
