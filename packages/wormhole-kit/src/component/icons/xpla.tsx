import * as React from 'react';

import type { IconProps } from './types';

export const Xpla = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        fill="none"
        viewBox="0 0 48 48"
      >
        <path
          fill="#00B1FF"
          d="M24 48c13.26 0 24-10.74 24-24S37.26 0 24 0 0 10.74 0 24s10.74 24 24 24Z"
        />
        <path
          fill="#fff"
          d="m27.435 25.71-1.695 1.695 11.64 11.67 1.695-1.695-11.64-11.67ZM10.59 8.895 8.895 10.59l11.67 11.67 1.695-1.695-11.67-11.67Zm26.775.03-11.64 11.67 1.695 1.695 11.64-11.67-1.695-1.695ZM20.595 25.74 8.955 37.41l1.695 1.695 11.64-11.67-1.695-1.695Z"
        />
      </svg>
    );
  },
);

Xpla.displayName = 'Xpla';

export default Xpla;
