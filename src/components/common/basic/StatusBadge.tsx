import styled from 'styled-components';
import { Badge } from '@chakra-ui/react';
import { Size } from '@utils/constants';
import Text from '@components/common/basic/Text';

type Props = {
  colorScheme: string;
  text: string;
  isInTopRight?: boolean;
};

export default function StatusBadge(props: Props) {
  const { colorScheme, text, isInTopRight = false } = props;

  return (
    <Component>
      <StyledBadge
        $isInTopRight={isInTopRight || false}
        colorScheme={colorScheme}
      >
        <Text size={{ base: Size.XXS, md: Size.XS, xl: Size.XS }}>{text}</Text>
      </StyledBadge>
    </Component>
  );
}

const Component = styled.div`
  flex-direction: column;
`;

const StyledBadge = styled(Badge)<{ $isInTopRight: boolean }>`
  position: ${({ $isInTopRight }) => $isInTopRight && 'absolute'};
  top: ${({ $isInTopRight }) => $isInTopRight && '10px'};
  right: ${({ $isInTopRight }) => $isInTopRight && '10px'};
`;
