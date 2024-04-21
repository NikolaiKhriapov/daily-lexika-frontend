import React, { useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Box } from '@chakra-ui/react';
import { FontWeight, Size } from '@utils/constants';
import { borderStyles } from '@utils/functions';
import { ContactMethod, DemoSubmitRequest, LanguageLevel } from '@utils/landing/constants';
import { theme } from '@utils/theme';
import Heading from '@components/ui-common/basic/Heading';
import Text from '@components/ui-common/basic/Text';
import InputFieldsWithButton from '@components/ui-common/complex/InputFieldsWithButton';
import Select from '@components/ui-common/complex/Select';
import TextInput from '@components/ui-common/complex/TextInput';

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

  return (
    <Container>
      <DemoClassBlock1>
        <TextContainer>
          <Text isCentered size={Size.MD} fontWeight={FontWeight.MEDIUM}>
            На пробном занятии мы можем познакомиться, определить Ваш уровень знания языка, выбрать программу обучения
            и ответить на все интересующие Вас вопросы. Вам понадобится компьютер, планшет или телефон с работающей
            камерой и микрофоном. Рекомендую выбрать тихое место с хорошим интернетом.
          </Text>
        </TextContainer>
        <YoutubeVideoContainer>
          <iframe
            width="705"
            height="397"
            src="https://www.youtube.com/embed/SjoNY306q1A?si=zNt9o0hZl46ItdKZ"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </YoutubeVideoContainer>
      </DemoClassBlock1>
      <DemoClassBlock2>
        <DemoSubmitForm>
          <Heading isCentered size={Size.LG}>Оставить заявку</Heading>
          <Space $height={35} />
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
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const DemoClassBlock1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const TextContainer = styled.div`
  display: flex;
  border: ${theme.stylesToDelete.borderWidth} ${theme.stylesToDelete.borderStyle} ${theme.colors.light.borderColor};
  border-radius: 30px;
  width: 706px;
  background-color: ${theme.colors.light.bgColor};
  padding: 20px;
`;

const YoutubeVideoContainer = styled.div`
  display: flex;
  border: ${theme.stylesToDelete.borderWidth} ${theme.stylesToDelete.borderStyle} ${theme.colors.light.borderColor};
  border-radius: 30px;
  overflow: hidden;
  width: fit-content;
`;

const DemoClassBlock2 = styled.div`
`;

const DemoSubmitForm = styled(Box)`
  width: 480px;
  padding: 30px;
  background-color: ${theme.colors.light.bgColor};
  border: ${borderStyles('light')};
  border-radius: 30px;
`;

const InputElements = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Space = styled.div<{ $height: number }>`
  display: flex;
  height: ${({ $height }) => `${$height}px`};
`;
