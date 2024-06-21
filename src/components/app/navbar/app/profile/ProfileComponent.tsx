import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Avatar, ColorMode, Menu, MenuButton, useColorMode, useDisclosure } from '@chakra-ui/react';
import { AuthContext } from '@context/app/AuthContext';
import { useGetUserQuery } from '@store/api/userAPI';
import { EmailLinks } from '@utils/app/constants';
import { Breakpoint, Page } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import UserPreferencesWindow from '@components/app/content/user/UserPreferencesWindow';
import UserProfileWindow from '@components/app/content/user/UserProfileWindow';
import Link from '@components/ui-common/basic/Link';
import MenuDivider from '@components/ui-common/basic/MenuDivider';
import MenuItem from '@components/ui-common/basic/MenuItem';
import MenuList from '@components/ui-common/basic/MenuList';
import Text from '@components/ui-common/basic/Text';

export default function ProfileComponent() {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { logout } = useContext(AuthContext);
  const { data: user } = useGetUserQuery();
  const { isOpen: isOpenProfile, onOpen: onOpenProfile, onClose: onCloseProfile } = useDisclosure();
  const { isOpen: isOpenPreferences, onOpen: onOpenPreferences, onClose: onClosePreferences } = useDisclosure();

  return (
    <Menu>
      <MenuButton>
        <AvatarStyled />
      </MenuButton>
      <MenuList>
        <MenuText>
          {user?.name}<br />
          {user?.email}
        </MenuText>
        <MenuDivider />
        <MenuItem onClick={onOpenProfile}>{t('ProfileComponent.profile')}</MenuItem>
        {isOpenProfile && <UserProfileWindow isOpen={isOpenProfile} onClose={onCloseProfile} />}
        <MenuItem onClick={onOpenPreferences}>{t('ProfileComponent.preferences')}</MenuItem>
        {isOpenPreferences && <UserPreferencesWindow isOpen={isOpenPreferences} onClose={onClosePreferences} />}
        <MenuDivider />
        <LinkStyled href={EmailLinks.ContactSupport} $colorMode={colorMode} style={{ textDecoration: 'none' }}>
          <MenuItem>{t('ProfileComponent.support')}</MenuItem>
        </LinkStyled>
        <LinkStyled href={EmailLinks.Feedback} $colorMode={colorMode} style={{ textDecoration: 'none' }}>
          <MenuItem>{t('ProfileComponent.feedback')}</MenuItem>
        </LinkStyled>
        <LinkStyled href={Page.PRIVACY_POLICY} $colorMode={colorMode} style={{ textDecoration: 'none' }} target="_blank">
          <MenuItem>{t('ProfileComponent.privacy')}</MenuItem>
        </LinkStyled>
        <MenuDivider />
        <MenuItem onClick={logout}>{t('ProfileComponent.logout')}</MenuItem>
      </MenuList>
    </Menu>
  );
}

const AvatarStyled = styled(Avatar)`
  height: 35px !important;
  width: 35px !important;
  margin: 2px 7px;
  background-color: ${theme.colors.mainBlue} !important;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    height: 45px !important;
    width: 45px !important;
  }
`;

const MenuText = styled(Text)`
  padding: 6px 12px;
`;

const LinkStyled = styled(Link)<{ $colorMode: ColorMode }>`
  color: ${({ $colorMode }) => theme.colors[$colorMode].buttonColor} !important;
`;
