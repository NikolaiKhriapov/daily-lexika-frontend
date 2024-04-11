import React, { useContext } from 'react';
import styled from 'styled-components';
import { Avatar, ColorMode, Menu, MenuButton, useColorMode, useDisclosure } from '@chakra-ui/react';
import { AuthContext } from '@context/app/AuthContext';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { EmailLinks } from '@utils/app/constants';
import { Breakpoint, Page } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import UserProfileWindow from '@components/app/content/user/UserProfileWindow';
import Link from '@components/ui-common/basic/Link';
import MenuDivider from '@components/ui-common/basic/MenuDivider';
import MenuItem from '@components/ui-common/basic/MenuItem';
import MenuList from '@components/ui-common/basic/MenuList';
import Text from '@components/ui-common/basic/Text';

export default function ProfileComponent() {
  const { colorMode } = useColorMode();
  const { logout } = useContext(AuthContext);
  const { isOpen: isOpenProfile, onOpen: onOpenProfile, onClose: onCloseProfile } = useDisclosure();

  const { data: user } = useGetUserInfoQuery();

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
        <MenuItem onClick={onOpenProfile}>Edit profile</MenuItem>
        {isOpenProfile && <UserProfileWindow isOpen={isOpenProfile} onClose={onCloseProfile} userDTO={user!} />}
        {/* <MenuItem>Preferences</MenuItem> */}
        <MenuDivider />
        <LinkStyled href={EmailLinks.ContactSupport} $colorMode={colorMode} style={{ textDecoration: 'none' }}>
          <MenuItem>Contact support</MenuItem>
        </LinkStyled>
        <LinkStyled href={EmailLinks.Feedback} $colorMode={colorMode} style={{ textDecoration: 'none' }}>
          <MenuItem>Leave feedback</MenuItem>
        </LinkStyled>
        <LinkStyled href={Page.PRIVACY_POLICY} $colorMode={colorMode} style={{ textDecoration: 'none' }} target="_blank">
          <MenuItem>Privacy Policy</MenuItem>
        </LinkStyled>
        <MenuDivider />
        <MenuItem onClick={logout}>Log out</MenuItem>
      </MenuList>
    </Menu>
  );
}

const AvatarStyled = styled(Avatar)`
  height: 35px !important;
  width: 35px !important;
  margin: 2px 7px;

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
