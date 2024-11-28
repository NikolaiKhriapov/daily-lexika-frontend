import React, { Dispatch, SetStateAction } from 'react';
import { CiCreditCard1 } from 'react-icons/ci';
import styled from 'styled-components';
import { Select } from '@chakra-ui/react';
import { AccountDto, Color, ColorRgb, CurrencyCode } from '@library/daily-budget';
import { Card, Input } from '@library/shared/ui';
import { StringUtil } from '@library/shared/utils';

type Props = {
  account: AccountDto;
  setAccount: Dispatch<SetStateAction<AccountDto>>
};

export default function AccountCard(props: Props) {
  const { account, setAccount } = props;

  return (
    <Card
      height="250px"
      width="450px"
      padding="0 25px"
      bgColor={ColorRgb[account.color]}
      face={(
        <ContentsContainer>
          <LineOneContainer>
            <CiCreditCard1 size={40} />
            <Input
              type="text"
              name="name"
              placeholder="Enter the title"
              value={account.name}
              onChange={(e) => setAccount({ ...account, name: e.target.value })}
            />
          </LineOneContainer>
          <LineOneContainer>
            <Input
              type="number"
              name="amount"
              value={account.amount}
              onChange={(e) => setAccount({ ...account, amount: e.target.value })}
            />
            <Select
              id="currencyCode"
              name="currencyCode"
              value={account.currencyCode}
              onChange={(e) => setAccount({ ...account, currencyCode: e.target.value as CurrencyCode })}
              width='120px'
            >
              {Object.values(CurrencyCode).map((currencyCode) => (
                <option key={currencyCode} value={currencyCode}>{currencyCode}</option>
              ))}
            </Select>
          </LineOneContainer>
          <Select
            id="color"
            name="color"
            value={account.color}
            onChange={(e) => setAccount({ ...account, color: e.target.value as Color })}
          >
            {Object.values(Color).map((color) => (
              <option key={color} value={color}>{StringUtil.toSentenceCase(color)}</option>
            ))}
          </Select>
        </ContentsContainer>
      )}
    />
  );
}

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 85%;
  width: 100%;
`;

const LineOneContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 20px;
`;
