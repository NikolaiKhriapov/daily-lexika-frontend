import React, { useEffect, useState } from 'react';
import { Avatar, ColorMode, Menu, MenuButton, MenuDivider, useColorMode, useDisclosure } from '@chakra-ui/react';
import styled from 'styled-components';
import Link from '@components/common/basic/Link';
import { theme } from 'src/utils/theme';
import MenuList from '../../common/basic/MenuList';
import UserAccountWindow from '../../user/UserAccountWindow';
import MenuItem from '../../common/basic/MenuItem';
import { mediaBreakpointUp } from '../../../src/utils/functions';
import { AppInfo, Breakpoint } from '../../../src/utils/constants';
import { useAuth } from '../../context/AuthContext';
import { UserDTO } from '../../../src/utils/types';
import { showUserAccount } from '../../../src/services/user';
import { errorNotification } from '../../../src/services/popup-notification';

export default function ProfileComponent() {
  const { logout } = useAuth();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userDTO, setUserDTO] = useState<UserDTO>();

  const fetchUserDTO = () => {
    showUserAccount()
      .then((response) => setUserDTO(response.data.data.userDTO))
      .catch((error) => errorNotification(error.code, error.response.data.message));
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
        <MenuItem onClick={onOpen}>Account</MenuItem>
        {isOpen && (
          <UserAccountWindow
            isOpen={isOpen}
            onClose={onClose}
            userDTO={userDTO!}
            updateUserAndName={updateUserAndName}
          />
        )}
        <MenuDivider />
        <LinkStyled href={`mailto:${AppInfo.EMAIL}`} $colorMode={colorMode} style={{ textDecoration: 'none' }}>
          <MenuItem>Contact Us</MenuItem>
        </LinkStyled>
        <MenuDivider />
        <MenuItem onClick={logout}>Log Out</MenuItem>
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

const LinkStyled = styled(Link)<{ $colorMode: ColorMode }>`
    color: ${({ $colorMode }) => theme.colors[$colorMode].buttonColor} !important;
`;
