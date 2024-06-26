import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Avatar, Menu, MenuButton } from '@chakra-ui/react';
import { AuthContext } from '@admin/context/AuthContext';
import { useGetUserQuery } from '@admin/store/api/userAPI';
import { MenuDivider, MenuItem, MenuList, Text } from '@library/shared/ui';
import { Breakpoint, mediaBreakpointUp, theme } from '@library/shared/utils';

export default function ProfileComponent() {
  const { t } = useTranslation();
  const { logout } = useContext(AuthContext);
  const { data: user } = useGetUserQuery();

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
