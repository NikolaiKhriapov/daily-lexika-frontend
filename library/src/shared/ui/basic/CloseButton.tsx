import { AiOutlineCloseCircle } from 'react-icons/ai';
import styled from 'styled-components';
import { nonHighlightableTap } from '../../utils/ui/functions';

type Props = {
  onClick: () => void;
};

export function CloseButton(props: Props) {
  const { onClick } = props;

  return (
    <Component onClick={onClick} />
  );
}

const Component = styled(AiOutlineCloseCircle)`
  font-size: 16px;
  cursor: pointer;
  ${nonHighlightableTap};
`;
