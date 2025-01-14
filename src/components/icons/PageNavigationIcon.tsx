import React from 'react';

function PageNavigationIcon({ previous }: { previous: boolean }) {
  const transform = previous ? 'rotate(180deg)' : undefined;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ height: '28px', width: '28px', transform }}>
      <path d="M0 0h512v512H0z" fill="#000000" fillOpacity="0.01" />
      <g transform="translate(0,0)">
        <path d="M84.41 106c-15.63.1-27.67 13.8-25.69 29.3 16 124 16 117.4 0 241.4-2.54 19.8 17.33 35 35.79 27.3L361.5 292.9v98.8c0 7.9 8.9 14.2 20 14.3h52c11.1-.1 20-6.4 20-14.3V120.2c-.1-7.8-9-14.1-20-14.2h-52c-11 .1-19.9 6.4-20 14.2v98.9L94.51 108c-3.2-1.3-6.63-2-10.1-2z" fill="#822000" fillOpacity="1" />
      </g>
    </svg>
  );
}
export default PageNavigationIcon;
