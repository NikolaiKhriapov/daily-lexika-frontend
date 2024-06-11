'use client';

import { createGlobalStyle } from 'styled-components';
import { fonts } from '@utils/fonts';

export const GlobalStyle = createGlobalStyle`
    :root {
        --font-rubik: ${fonts.rubik.style.fontFamily};
        --font-noto-serif-sc: ${fonts.notoSerifSC.style.fontFamily};
    }
`;
