import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import styled from 'styled-components';
import { nonHighlightableTap } from '../../utils/ui/functions';

type Props = {
  onClick: () => void;
};

export function ArrowRightButton(props: Props) {
  const { onClick } = props;

  return (
    <Component onClick={onClick} />
  );
}

const Component = styled(MdOutlineKeyboardArrowRight)`
  font-size: 22px;
  cursor: pointer;
  ${nonHighlightableTap};
`;
