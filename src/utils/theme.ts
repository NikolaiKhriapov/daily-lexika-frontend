import { extendTheme } from '@chakra-ui/react';
import { Breakpoint } from '@utils/constants';

const customColors = {
  light: {
    background: 'rgb(237,238,240)',
    background2: '#F7FAFC',
    bgColor: '#F7FAFC',
    borderColorMain: '#CBD5E0',
    borderColor: '#CBD5E0',
    hoverBgColor: '#E3E8EF',
    buttonColor: '#000000',
    buttonBgColor: '#CBD5E0',
    buttonHoverBgColor: '#A0AEC0',
    buttonRemoveHoverBgColor: '#F56565',
    reviewWordCardBgColor: '#E3E8EF',
    reviewWordCardBadgeRedColor: '#EF4444',
    progressBarBgColor: '#E4E8EE',
    progressCircularColor: '#8088A0',
    alert: '#F56565',
    cardAddNew: '#F7FAFC',
  },
  dark: {
    background: 'rgb(10,10,10)',
    background2: 'rgb(25,25,25)',
    bgColor: '#282828',
    borderColorMain: '#3C3C3C',
    borderColor: '#505050',
    hoverBgColor: '#3C3C3C',
    buttonColor: '#FFFFFF',
    buttonBgColor: '#3C3C3C',
    buttonHoverBgColor: '#505050',
    buttonRemoveHoverBgColor: '#EF4444',
    reviewWordCardBgColor: '#1E1E1E',
    reviewWordCardBadgeRedColor: '#800000',
    progressBarBgColor: '#505050',
    progressCircularColor: '#E4E8EE',
    alert: '#EF4444',
    cardAddNew: '#3C3C3C',
  },
  telegramBlue: 'rgb(73,150,214)',
  whatsAppGreen: 'rgb(100,205,110)',
};

const customBreakpoints = {
  base: Breakpoint.BASE,
  xs: Breakpoint.PHONE,
  sm: Breakpoint.PHONE_LG,
  md: Breakpoint.TABLET,
  lg: Breakpoint.LG,
  xl: Breakpoint.DESKTOP,
  '2xl': Breakpoint.XXL,
};

// TODO::: remove
const stylesToDelete = {
  light: {
    boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)',
  },
  dark: {
    boxShadow: '0 10px 10px rgba(0, 0, 0, 0.4)',
  },
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: '10px',
  link: 'blue.500',
};

const theme = extendTheme({
  colors: customColors,
  fonts: {
    heading: 'var(--font-rubik)',
    body: 'var(--font-rubik)',
    bodyCh: 'var(--font-noto-serif-sc)',
  },
  fontSizes: {},
  breakpoints: customBreakpoints,
  stylesToDelete,
  initialColorMode: 'system',
});

export { theme };
