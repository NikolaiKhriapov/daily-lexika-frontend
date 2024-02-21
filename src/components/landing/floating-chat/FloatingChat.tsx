import React from 'react';
import { BsChatText } from 'react-icons/bs';
import { RxCross1 } from 'react-icons/rx';
import Image from 'next/image';
import styled from 'styled-components';
import InstagramLogo from '@public/landing/logo-instagram.svg';
import TelegramLogo from '@public/landing/logo-telegram.png';
import WhatsappLogo from '@public/landing/logo-whatsapp.svg';
import { useAppDispatch, useAppSelector } from '@store/hooks/hooks';
import { toggleVisibility } from '@store/reducers/floatingChatSlice';
import { theme } from '@utils/theme';
import MessengerIconLink from '@components/landing/floating-chat/MessengerIconLink';

export default function FloatingChat() {
  const dispatch = useAppDispatch();
  const { isVisible } = useAppSelector((state) => state.floatingChatSlice);

  const messengerLinkMapping = [
    {
      href: "https://t.me/katerinachsherbakova",
      icon: <Image src={TelegramLogo} width={60} height={60} alt="logo-telegram" />,
    },
    {
      href: "https://wa.me/+79856494364",
      icon: <Image src={WhatsappLogo} width={60} height={60} alt="logo-whatsapp" />,
    },
    {
      href: "https://www.instagram.com/katerinachsherbakova",
      icon: <Image src={InstagramLogo} width={40} height={40} alt="logo-instagram" />,
    },
  ];

  return (
    <Container>
      <MessengersContainer>
        {messengerLinkMapping.map((messengerLink, index) => (
          <MessengerIconLink
            key={index}
            order={messengerLinkMapping.length - index}
            href={messengerLink.href}
            icon={messengerLink.icon}
            isVisible={isVisible}
          />
        ))}
      </MessengersContainer>
      <FloatingChatContainer
        onClick={() => dispatch(toggleVisibility())}
        $backgroundColor={isVisible ? theme.colors.white : theme.colors.black}
      >
        <ChatIcon $isVisible={isVisible} />
        <CrossIcon $isVisible={isVisible} />
      </FloatingChatContainer>
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 60px;
    right: 80px;
    gap: 18px;
`;

const MessengersContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
`;

const FloatingChatContainer = styled.button<{ $backgroundColor: string }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 70px;
    width: 70px;
    border-radius: 70px;
    z-index: 1000;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    transition: background-color 0.3s ease-in-out;
`;

const ChatIcon = styled(BsChatText)<{ $isVisible: boolean }>`
    color: ${theme.colors.white};
    height: ${({ $isVisible }) => ($isVisible ? '0' : '35px')};
    width: ${({ $isVisible }) => ($isVisible ? '0' : '35px')};
    transition: height 0.3s ease-in-out, width 0.3s ease-in-out;
`;

const CrossIcon = styled(RxCross1)<{ $isVisible: boolean }>`
    color: ${theme.colors.black};
    height: ${({ $isVisible }) => ($isVisible ? '25px' : '0')};
    width: ${({ $isVisible }) => ($isVisible ? '25px' : '0')};
    transition: height 0.3s ease-in-out, width 0.3s ease-in-out;
`;
