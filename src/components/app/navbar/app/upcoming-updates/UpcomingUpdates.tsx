import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { useGetUserQuery } from '@store/api/userAPI';
import { AppInfo, RoleNameBase } from '@utils/app/constants';
import { Breakpoint, Size } from '@utils/constants';
import { borderStyles, mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { FeaturePeriod, upcomingUpdatesData } from '@components/app/navbar/app/upcoming-updates/UpcomingUpdates.data';
import Heading from '@components/ui-common/basic/Heading';
import ProgressBar from '@components/ui-common/basic/ProgressBar';
import Spinner from '@components/ui-common/basic/Spinner';
import Text from '@components/ui-common/basic/Text';

export default function UpcomingUpdates() {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const { data: user } = useGetUserQuery();

  if (!user) return <Spinner />;

  return (
    <>
      <ColumnsContainer>
        {Object.values(FeaturePeriod).map((featurePeriod, index) => (
          <ColumnContainer key={index} $colorMode={colorMode}>
            <Heading size={Size.SM} isCentered>{upcomingUpdatesData(featurePeriod, t).title}</Heading>
            <RowsContainer $colorMode={colorMode}>
              {upcomingUpdatesData(featurePeriod, t).features[user.role! as RoleNameBase].map((item, index2) => (
                <RowContainer key={index2}>
                  <Text width='300px'>{item.name}</Text>
                  <ProgressBar width='100px' value={item.progress} />
                </RowContainer>
              ))}
            </RowsContainer>
          </ColumnContainer>
        ))}
      </ColumnsContainer>
      <Text size={Size.SM} isCentered>{t('UpcomingUpdatesComponent.version')}: {AppInfo.APP_VERSION}</Text>
    </>
  );
}

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
    
  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    flex-direction: row;
  }
`;

const ColumnContainer = styled.div<{ $colorMode: ColorMode }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
  border: ${({ $colorMode }) => borderStyles($colorMode)};
  border-radius: ${theme.stylesToDelete.borderRadius};
  padding: 15px;
`;

const RowsContainer = styled.div<{ $colorMode: ColorMode }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;
