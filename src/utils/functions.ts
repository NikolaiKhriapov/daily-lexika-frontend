import { ColorMode } from '@chakra-ui/react';
import { Breakpoint } from '@utils/constants';
import { theme } from '@utils/theme';
import { UserDTO, WordDataDTO } from '@utils/types';

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

export const getOriginalWordPackName = (wordPackName: string, user: UserDTO | null) => {
  const postfix = `__${user?.id}`;
  if (user && wordPackName.endsWith(postfix)) {
    return wordPackName.replace(postfix, '');
  }
  return wordPackName;
};

export const removeAccent = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const sortWordsChinese = (a: WordDataDTO, b: WordDataDTO) => {
  const nameA = removeAccent(a.transcription).toLowerCase();
  const nameB = removeAccent(b.transcription).toLowerCase();

  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
};
