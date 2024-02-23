import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import Skeleton, { SkeletonType } from '@components/common/basic/Skeleton';

type Props = {
  children?: ReactNode;
  type: SkeletonType;
  fixed?: number | null;
  isLoading: boolean;
};

export default function SkeletonWrapper(props: Props) {
  const { children, type, fixed = null, isLoading } = props;

  const [number, setNumber] = useState(1);

  useEffect(() => {
    if (fixed) {
      setNumber(fixed);
    } else {
      setTimeout(() => {
        setNumber(number + 1);
        if (number === 3) {
          setNumber(1);
        }
      }, 500);
    }
  }, [number]);

  return (
    <Container>
      {
        isLoading
          ? [...Array(number)].map((_, index) => <Skeleton key={index} type={type} />)
          : children
      }
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: baseline;
  gap: 40px;
`;
