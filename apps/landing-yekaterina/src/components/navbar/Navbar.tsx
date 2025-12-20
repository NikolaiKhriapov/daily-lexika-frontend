import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import styled from 'styled-components';
import { SectionId } from '@landing-yekaterina/utils/constants';
import { normalizeLocale, setStoredLocale, SUPPORTED_LOCALES, SupportedLocale } from '@landing-yekaterina/utils/locale';
import { Text } from '@library/shared/ui';
import { FontWeight, theme } from '@library/shared/utils';

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const sectionLinkMapping = [
    {
      id: SectionId.INTRO,
      text: t('nav.intro'),
    },
    {
      id: SectionId.DEMO_CLASS,
      text: t('nav.demoClass'),
    },
    {
      id: SectionId.CONSULTATION,
      text: t('nav.consultation'),
    },
    {
      id: SectionId.FEEDBACK,
      text: t('nav.feedback'),
    },
    {
      id: SectionId.DISCOUNTS,
      text: t('nav.discounts'),
    },
    {
      id: SectionId.FAQ,
      text: t('nav.faq'),
    },
  ];

  const currentLocale = normalizeLocale(i18n.language || 'en');

  return (
    <Container>
      <LinksContainer>
        {sectionLinkMapping.map((sectionLink) => (
          <SectionLink key={sectionLink.id} to={sectionLink.id} smooth duration={500}>
            <Text fontWeight={FontWeight.SEMIBOLD}>{sectionLink.text}</Text>
          </SectionLink>
        ))}
      </LinksContainer>
      <LanguageSelect
        aria-label={t('nav.languageLabel')}
        value={currentLocale}
        onChange={(event) => {
          const nextLocale = event.target.value as SupportedLocale;
          i18n.changeLanguage(nextLocale);
          setStoredLocale(nextLocale);
        }}
      >
        {SUPPORTED_LOCALES.map((locale) => (
          <option key={locale.code} value={locale.code}>
            {locale.label}
          </option>
        ))}
      </LanguageSelect>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: white;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 0 24px;
`;

const SectionLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
`;

const LinksContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LanguageSelect = styled.select`
  margin-left: auto;
  height: 36px;
  border: 1px solid ${theme.colors.light.borderColor};
  border-radius: 999px;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.25L5 4.75L9 1.25' stroke='%23333333' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 10px 6px;
  color: ${theme.colors.text};
  padding: 0 36px 0 12px;
  font-size: 14px;
  letter-spacing: 0.2px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    background: linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(238, 238, 238, 1));
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.light.borderColor};
    outline-offset: 2px;
  }
`;
