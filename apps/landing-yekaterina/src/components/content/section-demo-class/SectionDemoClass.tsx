import React, { useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Box } from '@chakra-ui/react';
import { ContactMethod, DemoSubmitRequest, LanguageLevel } from '@landing-yekaterina/utils/constants';
import { Heading, InputFieldsWithButton, Select, Text, TextInput } from '@library/shared/ui';
import { borderStyles, Breakpoint, FontWeight, Size, theme } from '@library/shared/utils';

export default function SectionDemoClass() {
  const [selectedContactMethod, setSelectedContactMethod] = useState<ContactMethod>();
  const [selectedLanguageLevel, setSelectedLanguageLevel] = useState<LanguageLevel>();

  const demoSubmitForm = {
    initialValues: {
      name: '',
      contactMethod: '',
      contactId: '',
      languageLevel: '',
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
      label: 'Имя пользователя или номер телефона',
      placeholder: '@username / +7(777)777-77-77',
    },
    [ContactMethod.WHATSAPP]: {
      label: 'Номер телефона',
      placeholder: '+7(777)777-77-77',
    },
    [ContactMethod.INSTAGRAM]: {
      label: 'Имя пользователя',
      placeholder: '@username',
    },
  };

  const infoItems = [
    {
      title: 'Платформа',
      text: 'Для урока необходимо заранее скачать приложение Zoom.',
    },
    {
      title: 'Подключение',
      text: 'Ссылку на занятие вы получаете за несколько минут до начала.',
    },
    {
      title: 'Длительность',
      text: '15–30 минут.',
    },
    {
      title: 'Оборудование',
      text: 'Вам потребуется телефон, планшет или компьютер с рабочей камерой и микрофоном.',
    },
    {
      title: 'Условия',
      text: 'Рекомендую выбрать тихое место с хорошим интернет-соединением.',
    },
  ];

  return (
    <Container>
      <DemoClassBlock1>
        <TextCard>
          <Text size={Size.MD} fontWeight={FontWeight.MEDIUM}>
            Пробное занятие это возможность познакомиться, определить ваш текущий уровень, обсудить ваши цели и
            выбрать программу обучения.
          </Text>
          <Text size={Size.MD}>
            Чтобы записаться на пробное занятие, пожалуйста, заполните форму справа. После заявки я свяжусь с вами для
            согласования удобного времени. Если у вас появятся вопросы по скачиванию или чему-либо еще, пожалуйста,
            пишите! ✨
          </Text>
        </TextCard>
        <InfoCard>
          <Heading size={Size.MD}>Что нужно знать</Heading>
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
          <Heading isCentered size={Size.LG}>Оставить заявку</Heading>
          <AutoSpacer />
          <InputFieldsWithButton
            validateOnMount
            initialValues={demoSubmitForm.initialValues}
            validationSchema={demoSubmitForm.validationSchema}
            onSubmit={demoSubmitForm.handleOnSubmit}
            inputElements={(
              <InputElements>
                <TextInput label="Имя" name="name" type="text" placeholder="Имя" />
                <Select
                  id="contactMethod"
                  name="contactMethod"
                  label="Способ связи"
                  placeholder="Выберите способ связи"
                  value={selectedContactMethod || ''}
                  onChange={(e) => setSelectedContactMethod(e.target.value as ContactMethod)}
                  isRequired
                >
                  <option value={ContactMethod.TELEGRAM}>Telegram</option>
                  <option value={ContactMethod.WHATSAPP}>WhatsApp</option>
                  <option value={ContactMethod.INSTAGRAM}>Instagram</option>
                </Select>
                {selectedContactMethod && (
                  <TextInput
                    label={contactIdMapping[selectedContactMethod].label}
                    name="contactId"
                    type="text"
                    placeholder={contactIdMapping[selectedContactMethod].placeholder}
                  />
                )}
                <Select
                  id="languageLevel"
                  name="languageLevel"
                  label="Примерный уровень языка"
                  placeholder="Выберите уровень"
                  value={selectedLanguageLevel || ''}
                  onChange={(e) => setSelectedLanguageLevel(e.target.value as LanguageLevel)}
                  isRequired
                >
                  <option value={LanguageLevel.UNKNOWN}>Не знаю свой уровень</option>
                  <option value={LanguageLevel.A1}>A1 – Beginner</option>
                  <option value={LanguageLevel.A2}>A2 – Pre-intermediate</option>
                  <option value={LanguageLevel.B1}>B1 – Intermediate</option>
                  <option value={LanguageLevel.B2}>B2 – Upper intermediate</option>
                  <option value={LanguageLevel.C1}>C1 – Advanced</option>
                  <option value={LanguageLevel.C2}>C2 – Proficient</option>
                </Select>
              </InputElements>
            )}
            buttonText="Отправить"
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
