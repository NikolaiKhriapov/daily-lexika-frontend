import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Avatar, ColorMode, Menu, MenuButton, useColorMode, useDisclosure } from '@chakra-ui/react';
import { AuthContext } from '@context/AuthContext';
import { showUserAccount } from '@services/user';
import { AppInfo, Breakpoint } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { UserDTO } from '@utils/types';
import Link from '@components/common/basic/Link';
import MenuDivider from '@components/common/basic/MenuDivider';
import MenuItem from '@components/common/basic/MenuItem';
import MenuList from '@components/common/basic/MenuList';
import Text from '@components/common/basic/Text';
import UserProfileWindow from '@components/user/UserProfileWindow';

export default function ProfileComponent() {
  const { user, logout } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const { isOpen: isOpenProfile, onOpen: onOpenProfile, onClose: onCloseProfile } = useDisclosure();
  const [userDTO, setUserDTO] = useState<UserDTO>();

  const fetchUserDTO = () => {
    showUserAccount()
      .then((response) => setUserDTO(response?.data.data.userDTO))
      .catch((error) => console.error(error.code, error.response.data.message));
  };

  useEffect(() => {
    fetchUserDTO();
  }, []);

  const updateUserAndName = (updatedUserDTO: UserDTO) => setUserDTO(updatedUserDTO);

  return (
    <Menu>
      <MenuButton>
        <AvatarStyled />
      </MenuButton>
      <MenuList>
        <MenuText>{user?.name}<br />{user?.username}</MenuText>
        <MenuDivider />
        <MenuItem onClick={onOpenProfile}>Edit profile</MenuItem>
        {isOpenProfile && (
          <UserProfileWindow
            isOpen={isOpenProfile}
            onClose={onCloseProfile}
            userDTO={userDTO!}
            updateUserAndName={updateUserAndName}
          />
        )}
        {/* <MenuItem>Preferences</MenuItem> */}
        <MenuDivider />
        <LinkStyled href={`mailto:${AppInfo.EMAIL}`} $colorMode={colorMode} style={{ textDecoration: 'none' }}>
          <MenuItem>Contact us</MenuItem>
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
