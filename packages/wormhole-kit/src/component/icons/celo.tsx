import * as React from 'react';

import type { IconProps } from './types';

export const Celo = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        id="Layer_1"
        viewBox="0 0 2500 2500"
        xmlSpace="preserve"
      >
        <g id="Layer_x0020_1">
          <g id="_1942792544736">
            <circle fill="#FCFF52" cx="1250" cy="1250" r="1250"></circle>
            <path d="M1949.3,546.2H550.7v1407.7h1398.7v-491.4h-232.1c-80,179.3-260.1,304.1-466.2,304.1    c-284.1,0-514.2-233.6-514.2-517.5c0-284,230.1-515.6,514.2-515.6c210.1,0,390.2,128.9,470.2,312.1h228.1V546.2z"></path>
          </g>
        </g>
      </svg>
    );
  },
);

Celo.displayName = 'Celo';

export default Celo;
