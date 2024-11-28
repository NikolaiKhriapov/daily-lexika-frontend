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

export default function AccountCardSmall(props: Props) {
  const { account } = props;

  return (
    <Card
      height="70px"
      width="450px"
      padding="15px 25px"
      bgColor={ColorRgb[account.color]}
      face={(
        <ContentsContainer>
          <IconAndNameContainer>
            <CiCreditCard1 size={40} />
            <Text size={Size.XXL} fontWeight={FontWeight.MEDIUM} isCentered>{account.name}</Text>
          </IconAndNameContainer>
          <Text size={Size.XXL} fontWeight={FontWeight.MEDIUM} isCentered>{account.amount} {account.currencyCode}</Text>
        </ContentsContainer>
      )}
    />
  );
}

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const IconAndNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
