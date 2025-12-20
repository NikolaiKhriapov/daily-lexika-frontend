import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Box } from '@chakra-ui/react';
import { ContactMethod, DemoSubmitRequest, LanguageLevel } from '@landing-yekaterina/utils/constants';
import { Heading, InputFieldsWithButton, Select, Text, TextInput } from '@library/shared/ui';
import { borderStyles, Breakpoint, FontWeight, Size, theme } from '@library/shared/utils';

export default function SectionConsultationForTeachers() {
  const [selectedContactMethod, setSelectedContactMethod] = useState<ContactMethod>();
  const [selectedLanguageLevel, setSelectedLanguageLevel] = useState<LanguageLevel>();
  const { t } = useTranslation();

  const topics = t('consultation.topics', { returnObjects: true }) as string[];
  const formatItems = t('consultation.formatItems', { returnObjects: true }) as string[];
  const demoSubmitForm = {
    initialValues: {
      name: '',
      contactMethod: '',
      contactId: '',
      languageLevel: '',
      city: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required(' '),
      contactId: Yup.string().trim().required(' '),
    }),
    handleOnSubmit: (demoSubmitRequest: DemoSubmitRequest, { setSubmitting }: any) => {
      setSubmitting(true);
      console.log(demoSubmitRequest);
      setSubmitting(false);
    },
  };

  const contactIdMapping = {
    [ContactMethod.TELEGRAM]: {
      label: t('demoClass.form.contactId.telegram.label'),
      placeholder: t('demoClass.form.contactId.telegram.placeholder'),
    },
    [ContactMethod.WHATSAPP]: {
      label: t('demoClass.form.contactId.whatsapp.label'),
      placeholder: t('demoClass.form.contactId.whatsapp.placeholder'),
    },
    [ContactMethod.INSTAGRAM]: {
      label: t('demoClass.form.contactId.instagram.label'),
      placeholder: t('demoClass.form.contactId.instagram.placeholder'),
    },
    [ContactMethod.EMAIL]: {
      label: t('demoClass.form.contactId.email.label'),
      placeholder: t('demoClass.form.contactId.email.placeholder'),
    },
  };

  return (
    <Container>
      <LeftColumn>
        <TextCard>
          <Text size={Size.MD} fontWeight={FontWeight.MEDIUM}>
            {t('consultation.description.line1')}
          </Text>
          <Text size={Size.MD}>
            {t('consultation.description.line2')}
          </Text>
          <Text size={Size.MD}>
            {t('consultation.cta.line2')}
          </Text>
        </TextCard>
        <InfoCard>
          <Heading size={Size.MD}>{t('consultation.formatTitle')}</Heading>
          <List>
            {formatItems.map((item) => (
              <Text as="li" key={item} size={Size.SM}>
                {item}
              </Text>
            ))}
          </List>
        </InfoCard>
        <InfoCard>
          <Heading size={Size.MD}>{t('consultation.topicsTitle')}</Heading>
          <List>
            {topics.map((topic) => (
              <Text as="li" key={topic} size={Size.SM}>
                {topic}
              </Text>
            ))}
          </List>
        </InfoCard>
      </LeftColumn>
      <RightColumn>
        <DemoSubmitForm>
          <Heading isCentered size={Size.LG}>{t('demoClass.form.title')}</Heading>
          <AutoSpacer />
          <InputFieldsWithButton
            validateOnMount
            initialValues={demoSubmitForm.initialValues}
            validationSchema={demoSubmitForm.validationSchema}
            onSubmit={demoSubmitForm.handleOnSubmit}
            inputElements={(
              <InputElements>
                <TextInput
                  label={t('demoClass.form.nameLabel')}
                  name="name"
                  type="text"
                  placeholder={t('demoClass.form.namePlaceholder')}
                />
                <Select
                  id="contactMethod"
                  name="contactMethod"
                  label={t('demoClass.form.contactMethodLabel')}
                  placeholder={t('demoClass.form.contactMethodPlaceholder')}
                  value={selectedContactMethod || ''}
                  onChange={(e) => setSelectedContactMethod(e.target.value as ContactMethod)}
                  isRequired
                >
                  <option value={ContactMethod.TELEGRAM}>{t('demoClass.contactMethods.telegram')}</option>
                  <option value={ContactMethod.WHATSAPP}>{t('demoClass.contactMethods.whatsapp')}</option>
                  <option value={ContactMethod.INSTAGRAM}>{t('demoClass.contactMethods.instagram')}</option>
                  <option value={ContactMethod.EMAIL}>{t('demoClass.contactMethods.email')}</option>
                </Select>
                {selectedContactMethod && (
                  <TextInput
                    label={contactIdMapping[selectedContactMethod].label}
                    name="contactId"
                    type="text"
                    placeholder={contactIdMapping[selectedContactMethod].placeholder}
                  />
                )}
                <TextInput
                  label={t('demoClass.form.cityLabel')}
                  name="city"
                  type="text"
                  placeholder={t('demoClass.form.cityPlaceholder')}
                />
                <Select
                  id="languageLevel"
                  name="languageLevel"
                  label={t('demoClass.form.languageLevelLabel')}
                  placeholder={t('demoClass.form.languageLevelPlaceholder')}
                  value={selectedLanguageLevel || ''}
                  onChange={(e) => setSelectedLanguageLevel(e.target.value as LanguageLevel)}
                  isRequired
                >
                  <option value={LanguageLevel.UNKNOWN}>{t('demoClass.languageLevels.unknown')}</option>
                  <option value={LanguageLevel.A1}>{t('demoClass.languageLevels.a1')}</option>
                  <option value={LanguageLevel.A2}>{t('demoClass.languageLevels.a2')}</option>
                  <option value={LanguageLevel.B1}>{t('demoClass.languageLevels.b1')}</option>
                  <option value={LanguageLevel.B2}>{t('demoClass.languageLevels.b2')}</option>
                  <option value={LanguageLevel.C1}>{t('demoClass.languageLevels.c1')}</option>
                  <option value={LanguageLevel.C2}>{t('demoClass.languageLevels.c2')}</option>
                </Select>
              </InputElements>
            )}
            buttonText={t('demoClass.form.buttonText')}
          />
        </DemoSubmitForm>
      </RightColumn>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  gap: 24px;
  align-items: stretch;

  @media (max-width: ${Breakpoint.LG}) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RightColumn = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: ${Breakpoint.LG}) {
    width: 100%;
  }
`;

const TextCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background-color: ${theme.colors.light.bgColor};
  border: ${borderStyles('light')};
  border-radius: 24px;
`;

const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background-color: ${theme.colors.light.bgColor};
  border: ${borderStyles('light')};
  border-radius: 24px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 20px;
`;

const DemoSubmitForm = styled(Box)`
  padding: 30px;
  background-color: ${theme.colors.light.bgColor};
  border: ${borderStyles('light')};
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100%;
`;

const InputElements = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const AutoSpacer = styled.div`
  flex: 1 1 auto;
  min-height: 20px;
`;
