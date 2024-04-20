import React from 'react';
import styled from 'styled-components';
import { ColorMode, useColorMode } from '@chakra-ui/react';
import { Breakpoint } from '@utils/constants';
import { mediaBreakpointUp } from '@utils/functions';
import { theme } from '@utils/theme';
import { EffectCards, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper as ChakraSwiper, SwiperProps, SwiperSlide as ChakraSwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

export default function Swiper(props: SwiperProps) {
  const { children, ...rest } = props;

  const { colorMode } = useColorMode();

  return (
    <>
      <SwiperContainerMobile>
        <SwiperStyled
          $colorMode={colorMode}
          slidesPerView={1}
          modules={[EffectCards, Mousewheel]}
          effect="cards"
          mousewheel
          cardsEffect={{ perSlideOffset: 10, slideShadows: false }}
          {...rest}
        >
          {children}
        </SwiperStyled>
      </SwiperContainerMobile>
      <SwiperContainerTabletAndDesktop>
        <SwiperStyled
          $colorMode={colorMode}
          spaceBetween={40}
          centeredSlides={false}
          mousewheel
          pagination
          slidesPerView="auto"
          modules={[Mousewheel, Navigation, Pagination]}
          style={{ margin: '0' }}
        >
          {children}
        </SwiperStyled>
      </SwiperContainerTabletAndDesktop>
    </>
  );
}

const SwiperStyled = styled(ChakraSwiper)<{ $colorMode: ColorMode }>`
  display: flex;
  justify-content: center;
  min-width: 215px;
  width: calc(100vw - 200px);

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    width: 100%;
    height: 315px;
    padding: 0 7px;

    .swiper-slide {
      width: min-content !important;
    }

    .swiper-pagination-bullet {
      background-color: ${({ $colorMode }) => theme.colors[$colorMode].buttonHoverBgColor};
    }

    .swiper-pagination-bullet-active {
      background-color: ${theme.colors.mainBlue};
    }
  }
`;

const SwiperContainerMobile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100vw - 80px);

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    display: none;
  }
`;

const SwiperContainerTabletAndDesktop = styled.div`
  display: none;

  ${mediaBreakpointUp(Breakpoint.TABLET)} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100vw - 100px);
  }

  ${mediaBreakpointUp(Breakpoint.DESKTOP)} {
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
`;

export const SwiperSlide = styled(ChakraSwiperSlide)`
  display: flex;
  justify-content: center;
  height: 305px;
  min-width: 215px;
  width: calc(100vw - 200px);
`;
