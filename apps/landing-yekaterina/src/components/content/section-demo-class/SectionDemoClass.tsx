import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Box } from '@chakra-ui/react';
import { ContactMethod, DemoSubmitRequest, LanguageLevel } from '@landing-yekaterina/utils/constants';
import { Heading, InputFieldsWithButton, Select, Text, TextInput } from '@library/shared/ui';
import { borderStyles, Breakpoint, FontWeight, Size, theme } from '@library/shared/utils';

export default function SectionDemoClass() {
  const [selectedContactMethod, setSelectedContactMethod] = useState<ContactMethod>();
  const [selectedLanguageLevel, setSelectedLanguageLevel] = useState<LanguageLevel>();
  const { t } = useTranslation();

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

  const infoItems = t('demoClass.infoItems', { returnObjects: true }) as Array<{
    title: string;
    text: string;
  }>;

  return (
    <Container>
      <DemoClassBlock1>
        <TextCard>
          <Text size={Size.MD} fontWeight={FontWeight.MEDIUM}>
            {t('demoClass.description.line1')}
          </Text>
          <Text size={Size.MD}>
            {t('demoClass.description.line2')}
          </Text>
        </TextCard>
        <InfoCard>
          <Heading size={Size.MD}>{t('demoClass.infoTitle')}</Heading>
          <InfoList>
            {infoItems.map((item) => (
              <InfoListItem key={item.title}>
                <Text as="span" fontWeight={FontWeight.MEDIUM}>{item.title}:</Text>{' '}
                <Text as="span">{item.text}</Text>
              </InfoListItem>
            ))}
          </InfoList>
        </InfoCard>
      </DemoClassBlock1>
      <DemoClassBlock2>
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
      </DemoClassBlock2>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 30px;
  width: 100%;

  @media (max-width: ${Breakpoint.LG}) {
    flex-direction: column;
  }
`;

const DemoClassBlock1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DemoClassBlock2 = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-self: stretch;

  @media (max-width: ${Breakpoint.LG}) {
    width: 100%;
  }
`;

const TextCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: ${theme.stylesToDelete.borderWidth} ${theme.stylesToDelete.borderStyle} ${theme.colors.light.borderColor};
  border-radius: 30px;
  background-color: ${theme.colors.light.bgColor};
  padding: 24px;
`;

const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: ${borderStyles('light')};
  border-radius: 30px;
  background-color: ${theme.colors.light.bgColor};
  padding: 24px;
`;

const DemoSubmitForm = styled(Box)`
  padding: 30px;
  background-color: ${theme.colors.light.bgColor};
  border: ${borderStyles('light')};
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100%;
`;

const InfoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 20px;
`;

const InfoListItem = styled.li`
  line-height: 1.5;
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
