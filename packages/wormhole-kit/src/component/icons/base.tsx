import * as React from 'react';

import type { IconProps } from './types';

export const Base = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_83_38736)">
          <path
            d="M8 16C9.58225 16 11.129 15.5308 12.4446 14.6518C13.7602 13.7727 14.7855 12.5233 15.391 11.0615C15.9965 9.59966 16.155 7.99113 15.8463 6.43928C15.5376 4.88743 14.7757 3.46197 13.6569 2.34315C12.538 1.22433 11.1126 0.462403 9.56072 0.153721C8.00887 -0.15496 6.40034 0.00346632 4.93853 0.608967C3.47672 1.21447 2.22729 2.23985 1.34824 3.55544C0.469192 4.87103 0 6.41775 0 8C0 10.1217 0.842854 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16Z"
            fill="#0052FF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.98118 13.6338C11.0926 13.6338 13.615 11.1115 13.615 8.00001C13.615 4.88855 11.0926 2.36621 7.98118 2.36621C5.0294 2.36621 2.60783 4.6363 2.36705 7.52588H10.7273V8.464H2.36621C2.60216 11.3584 5.02595 13.6338 7.98118 13.6338Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_83_38736">
            <rect width="16" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);

Base.displayName = 'Base';

export default Base;
