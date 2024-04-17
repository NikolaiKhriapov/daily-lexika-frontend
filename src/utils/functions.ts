import { ColorMode } from '@chakra-ui/react';
import { Breakpoint } from '@utils/constants';
import { theme } from '@utils/theme';
import { UserDto, WordDataDto } from '@utils/types';

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

export const getOriginalWordPackName = (wordPackName: string, user: UserDto | null) => {
  const postfix = `__${user?.id}`;
  const prefixEn = 'EN__';
  const prefixCh = 'CH__';

  if (user && wordPackName.endsWith(postfix)) {
    wordPackName = wordPackName.replace(postfix, '');
  }
  if (user && (wordPackName.startsWith(prefixEn))) {
    wordPackName = wordPackName.replace(prefixEn, '');
  }
  if (user && (wordPackName.startsWith(prefixCh))) {
    wordPackName = wordPackName.replace(prefixCh, '');
  }

  return wordPackName;
};

export const removeAccent = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const sortWordsChinese = (a: WordDataDto, b: WordDataDto) => {
  const nameA = removeAccent(a.transcription).toLowerCase();
  const nameB = removeAccent(b.transcription).toLowerCase();

  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
};
