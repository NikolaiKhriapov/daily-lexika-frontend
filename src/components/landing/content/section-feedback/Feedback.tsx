import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@chakra-ui/react';
import { FontWeight, Size } from '@utils/constants';
import { theme } from '@utils/theme';
import Text from '@components/ui-common/basic/Text';

export type FeedbackProps = {
  // eslint-disable-next-line react/require-default-props
  photo?: any;
  nameAndAge: string;
  occupation: string;
  durationOfStudy: string;
  text: string;
};

export default function Section4FeedbackFromStudents(props: FeedbackProps) {
  const { photo, nameAndAge, occupation, durationOfStudy, text } = props;

  return (
    <Container>
      <BioContainer>
        {photo || <AvatarStyled />}
        <BioInfo>
          <Text fontWeight={FontWeight.SEMIBOLD} size={Size.LG}>{nameAndAge}</Text>
          <Text fontWeight={FontWeight.SEMIBOLD}>{occupation}</Text>
          <Text fontWeight={FontWeight.SEMIBOLD}>{durationOfStudy}</Text>
        </BioInfo>
      </BioContainer>
      <Text isCentered size={Size.LG} fontStyle="italic">&quot;{text}&quot;</Text>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 20px;
  border: ${theme.stylesToDelete.borderWidth} ${theme.stylesToDelete.borderStyle} ${theme.colors.light.borderColor};
  border-radius: 30px;
  width: 400px;
  height: 380px;
  background-color: ${theme.colors.light.bgColor};
  padding: 30px;
`;

const BioContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BioInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AvatarStyled = styled(Avatar)`
  height: 70px !important;
  width: 70px !important;
  margin: 15px 15px;
`;
