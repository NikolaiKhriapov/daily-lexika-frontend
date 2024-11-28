import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useBreakpointValue } from '@chakra-ui/react';
import { useCreateAccountMutation, useUpdateAccountMutation } from '@daily-budget/store/api/accountAPI';
import { useGetUserQuery } from '@daily-budget/store/api/userAPI';
import { AccountDto, Color, CurrencyCode } from '@library/daily-budget';
import { errorNotification, successNotification } from '@library/shared/services';
import { Button, ButtonType, Drawer, Spinner } from '@library/shared/ui';

import AccountCardDraft from './AccountCardDraft';

const initAccountDto: AccountDto = {
  id: undefined,
  userId: undefined,
  name: '',
  amount: '0',
  currencyCode: CurrencyCode.USD,
  color: Color.WHITE,
  isActive: undefined,
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  account?: AccountDto;
};

export default function CreateOrUpdateAccountModal(props: Props) {
  const { isOpen, onClose, account = null } = props;

  const { t } = useTranslation();
  const { data: user } = useGetUserQuery();
  const [createAccount] = useCreateAccountMutation();
  const [updateAccount] = useUpdateAccountMutation();
  const [accountDto, setAccountDto] = useState(account || initAccountDto);

  const drawerWidth = useBreakpointValue({ base: '80vw', md: '600px' });

  if (!user) return <Spinner />;

  const onClick = () => {
    onClose();
    if (account) {
      updateAccount({ accountId: account.id!, accountDto })
        .unwrap()
        .then(() => successNotification(t('CreateOrUpdateAccountModal.accountUpdated'), `${account.name} was successfully saved`))
        .catch((error) => errorNotification('', error))
    } else {
      createAccount(accountDto)
        .unwrap()
        .then(() => successNotification(t('CreateOrUpdateAccountModal.accountSaved'), `${accountDto.name} was successfully saved`))
        .catch((error) => errorNotification('', error))
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      width={drawerWidth}
      header='New Account'
      body={(
        <Container>
          <AccountCardDraft
            account={accountDto}
            setAccount={setAccountDto}
          />
          <Button
            buttonType={ButtonType.BUTTON}
            buttonText={!account ? t('buttonText.create') : t('buttonText.update')}
            onClick={onClick}
            width='150px'
          />
        </Container>
      )}
    />
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
