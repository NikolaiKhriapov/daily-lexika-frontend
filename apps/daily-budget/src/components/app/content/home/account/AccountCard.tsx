import React, { useState } from 'react';
import { CiCreditCard1 } from 'react-icons/ci';
import styled from 'styled-components';
import { useDisclosure } from '@chakra-ui/react';
import CreateOrUpdateAccountModal from '@daily-budget/components/app/content/home/account/CreateOrUpdateAccountModal';
import { AccountDto, ColorRgb } from '@library/daily-budget';
import { ButtonWithIcon, ButtonWithIconType, Card, Text } from '@library/shared/ui';
import { FontWeight, Size } from '@library/shared/utils';

type Props = {
  account: AccountDto;
};

export default function AccountCard(props: Props) {
  const { account } = props;

  const { isOpen: isOpenChangeButton, onOpen: onOpenChangeButton, onClose: onCloseChangeButton } = useDisclosure();
  const [isFlipped, setFlipped] = useState(false);

  const onClickChangeButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onOpenChangeButton();
  };

  return (
    <Card
      height="250px"
      width="450px"
      padding="15px 25px"
      bgColor={ColorRgb[account.color]}
      isFlipped={isFlipped}
      setFlipped={setFlipped}
      face={(
        <ContentsContainer>
          <TopThirdContainer>
            <LineContainer>
              <IconAndNameContainer>
                <CiCreditCard1 size={40} />
                <Text size={Size.XXL} fontWeight={FontWeight.MEDIUM} isCentered>{account.name}</Text>
              </IconAndNameContainer>
              <ButtonWithIcon
                type={ButtonWithIconType.CHANGE}
                onClick={onClickChangeButton}
                isOpen={isOpenChangeButton}
                modalContent={(
                  <CreateOrUpdateAccountModal
                    isOpen={isOpenChangeButton}
                    onClose={onCloseChangeButton}
                    account={account}
                  />
                )}
              />
            </LineContainer>
          </TopThirdContainer>
          <MiddleThirdContainer>
            <Text size={Size.XXXL} fontWeight={FontWeight.MEDIUM} isCentered>{account.amount} {account.currencyCode}</Text>
          </MiddleThirdContainer>
          <BottomThirdContainer />
        </ContentsContainer>
        )}
      back={<></>}
    />
  );
}

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const TopThirdContainer = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100%;
  width: 100%;
`;

const LineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const IconAndNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MiddleThirdContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const BottomThirdContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
