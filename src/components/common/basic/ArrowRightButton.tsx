import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import styled from 'styled-components';

type Props = {
  onClick: () => void;
};

export default function ArrowRightButton(props: Props) {
  const { onClick } = props;

  return (
    <Component onClick={onClick} />
  );
}

const Component = styled(MdOutlineKeyboardArrowRight)`
  font-size: 22px;
  cursor: pointer;
`;
