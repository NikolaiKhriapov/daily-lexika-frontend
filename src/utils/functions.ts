import { ColorMode } from '@chakra-ui/react';
import { Breakpoint } from '@utils/constants';
import { theme } from '@utils/theme';

export const mediaBreakpointUp: (breakpoint: Breakpoint | string) => string = (breakpoint) =>
  `@media (min-width: ${breakpoint})`;

export const borderStyles: (colorMode: ColorMode) => string = (colorMode) =>
  `${theme.stylesToDelete.borderWidth} ${theme.stylesToDelete.borderStyle} ${theme.colors[colorMode].borderColor}`;

export const hiddenScrollbar = () => `
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer */
  &::-webkit-scrollbar {
    display: none; /* WebKit */
  }
`;

export const nonHighlightableTap = () => `
  -webkit-tap-highlight-color: transparent;
`;

export const nonSelectableText = () => `
  -webkit-user-select:none !important;
  -moz-user-select:-moz-none !important;
  -ms-user-select:none !important;
  user-select:none !important;
`;

export const addShakeKeyframes = () => {
  if (!document.querySelector('#shake-keyframes')) {
    const style = document.createElement('style');
    style.id = 'shake-keyframes';
    style.innerHTML = `
      @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        50% { transform: translateX(10px); }
        75% { transform: translateX(-10px); }
        100% { transform: translateX(0); }
      }
    `;
    document.head.appendChild(style);
  }
};
