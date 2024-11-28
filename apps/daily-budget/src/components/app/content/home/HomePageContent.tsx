import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CiCreditCard1 } from 'react-icons/ci';
import styled from 'styled-components';
import { useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import AccountCard from '@daily-budget/components/app/content/home/account/AccountCard';
import AccountCardSmall from '@daily-budget/components/app/content/home/account/AccountCardSmall';
import { useGetAllAccountsQuery } from '@daily-budget/store/api/accountAPI';
import { useGetAllExpenseOperationsByAccountIdQuery } from '@daily-budget/store/api/expenseOperationAPI';
import { AccountDto } from '@library/daily-budget';
import { Heading, IndexPageContainer, Text } from '@library/shared/ui';
import { Breakpoint, FontWeight, mediaBreakpointUp, Size } from '@library/shared/utils';

import AccountCardNew from './account/AccountCardNew';
import CreateOrUpdateAccountModal from './account/CreateOrUpdateAccountModal';

export default function HomePageContent() {
  const { t } = useTranslation();
  const { data: allAccounts = [] } = useGetAllAccountsQuery();
  const { isOpen: isOpenCreateAccountButton, onOpen: onOpenCreateAccountButton, onClose: onCloseCreateAccountButton } = useDisclosure();
  const [selectedAccount, setSelectedAccount] = useState<AccountDto | null>(null);

  const { data: allExpenseOperationsByAccountId = [] } = useGetAllExpenseOperationsByAccountIdQuery(
    selectedAccount ? selectedAccount.id! : 0
    // { skip: selectedAccount !== undefined }
  );

  const noAccountsText = useBreakpointValue({
    base: t('ReviewsPage.noAccounts.text.base'),
    md: t('ReviewsPage.noAccounts.text.md'),
  });

  const noAccountsComponent = (
    <IndexPageContainer>
      <Heading size={Size.LG} isCentered>{t('ReviewsPage.noAccounts.heading')}</Heading>
      <Text size={Size.LG} isCentered>{noAccountsText}</Text>
      <Text />
    </IndexPageContainer>
  );

  return (
    <>
      <ContainerDesktop>
        <CardsContainer>
          {allAccounts.length === 0
            ? noAccountsComponent
            : allAccounts.map((accountDto) => (
              <ClickableContainer key={accountDto.id} onClick={() => setSelectedAccount(accountDto)}>
                <AccountCardSmall account={accountDto} />
              </ClickableContainer>
            ))
          }
          <ClickableContainer onClick={onOpenCreateAccountButton}>
            <AccountCardNew />
          </ClickableContainer>
        </CardsContainer>

        <OperationsContainer>
          {selectedAccount && (
            <>
              <AccountCard account={selectedAccount} />
              {allExpenseOperationsByAccountId.length === 0
                ? noAccountsComponent
                : allExpenseOperationsByAccountId.map((expenseOperationDto) => (
                  <OperationContainer key={expenseOperationDto.id}>
                    <IconAndNameContainer>
                      <CiCreditCard1 size={40} />
                      <Text size={Size.XL} fontWeight={FontWeight.MEDIUM} isCentered>{expenseOperationDto.category}</Text>
                    </IconAndNameContainer>
                    <Text size={Size.XL} fontWeight={FontWeight.MEDIUM} isCentered>{expenseOperationDto.amount} {expenseOperationDto.currencyCode}</Text>
                  </OperationContainer>
                ))
              }
            </>
          )}
        </OperationsContainer>
      </ContainerDesktop>

      {isOpenCreateAccountButton && (
        <CreateOrUpdateAccountModal
          isOpen={isOpenCreateAccountButton}
          onClose={onCloseCreateAccountButton}
        />
      )}
    </>
  );
}

const ContainerDesktop = styled.div`
  display: none;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-content: baseline;
    width: calc(100vw - 100px);
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ClickableContainer = styled.div`
`;

const OperationsContainer = styled.div`
`;

const OperationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const IconAndNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
