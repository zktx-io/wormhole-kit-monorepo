import * as React from 'react';

import type { IconProps } from './types';

export const Acala = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        fill="none"
        viewBox="0 0 490 490"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M245 490c135.31 0 245-109.69 245-245S380.31 0 245 0 0 109.69 0 245s109.69 245 245 245zm1-23c122.61 0 222-99.393 222-222S368.607 23 246 23 24 122.393 24 245s99.393 222 222 222zm-1-17c113.22 0 205-91.782 205-205S358.218 40 245 40 40 131.782 40 245s91.782 205 205 205zm.5-25c99.687 0 180.5-80.813 180.5-180.5S345.187 64 245.5 64 65 144.813 65 244.5 145.813 425 245.5 425zM235.313 98.66l130.68 226.7 14.012-24.31-116.66-202.39zm-125.31 201.98 111.84-194.03.231.4.22-.382 132.54 229.93h-28.025l-33.484-58.088c-15.215-4.81-31.414-7.404-48.22-7.404-8.663 0-17.117.605-25.336 1.812l16.14-27.956c3.047-.149 6.113-.224 9.196-.224 10.267 0 20.339.831 30.154 2.43l-53.195-92.284-98.05 170.1zm76.035-2.949 50.256-87.186-14.012-24.309-86.676 150.37h28.025l.266-.462c24.037-14.472 51.619-21.787 81.737-21.787 19.232 0 37.67 3.397 54.747 9.625l-18.775-32.52a187.14 187.14 0 0 0-35.972-3.472c-20.842 0-40.885 3.425-59.596 9.744z"
          clipRule="evenodd"
          fill={color}
          fillRule="evenodd"
        />
        <defs>
          <linearGradient
            id="a"
            x1="462.5"
            x2="101"
            y1="490"
            y2="43.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5A81FF" offset="0" />
            <stop stopColor="#E40C5B" offset=".524" />
            <stop stopColor="#FF4C3B" offset="1" />
          </linearGradient>
        </defs>
      </svg>
    );
  },
);

Acala.displayName = 'Acala';

export default Acala;
