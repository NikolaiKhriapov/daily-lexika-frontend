import React, { useState } from 'react';
import { GoAlert } from 'react-icons/go';
import styled from 'styled-components';
import { Tooltip } from '@chakra-ui/react';
import { Breakpoint } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';

type Props = {
  tooltipText: string;
};

export default function UnderDevelopmentIcon(props: Props) {
  const { tooltipText } = props;

  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const onClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    setTooltipVisible(true);
    setTimeout(() => {
      setTooltipVisible(false);
    }, 2000);
  };

  return (
    <>
      <ContainerMobileAndTablet>
        <Tooltip
          label={tooltipText}
          placement='bottom'
          hasArrow
          textAlign='center'
          isOpen={isTooltipVisible}
          maxWidth='90vw'
          borderRadius='10px'
        >
          <span><GoAlert color='yellow' onClick={(e) => onClick(e)} /></span>
        </Tooltip>
      </ContainerMobileAndTablet>
      <ContainerDesktop>
        <Tooltip
          label={tooltipText}
          placement='bottom'
          hasArrow
          textAlign='center'
          borderRadius='10px'
        >
          <span><GoAlert color='orange' /></span>
        </Tooltip>
      </ContainerDesktop>
    </>
  );
}

const ContainerMobileAndTablet = styled.div`
  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    display: none;
  }
`;

const ContainerDesktop = styled.div`
  display: none;

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    display: inherit;
  }
`;
