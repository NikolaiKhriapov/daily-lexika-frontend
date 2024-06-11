import React from 'react';
import { fonts } from '@utils/fonts';

export default function GlobalStyle() {
  return (
    <style jsx global>
      {`
          :root {
              --font-rubik: ${fonts.rubik.style.fontFamily};
              --font-noto-serif-sc: ${fonts.notoSerifSC.style.fontFamily};
          }
      `}
    </style>
  );
}
