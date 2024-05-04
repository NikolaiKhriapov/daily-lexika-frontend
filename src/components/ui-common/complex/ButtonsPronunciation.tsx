import React, { useState } from 'react';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { RoleName } from '@utils/app/constants';
import { WordDto } from '@utils/types';
import ButtonWithIcon, { ButtonWithIconType } from '@components/ui-common/basic/ButtonWithIcon';

enum EngDialects {
  US = 'en-US',
  GB = 'en-GB',
}

type Props = {
  word: WordDto;
};

export default function ButtonsPronunciation(props: Props) {
  const { word } = props;

  const { data: user } = useGetUserInfoQuery();
  const userRole = user!.role!;
  const [engDialect, setEngDialect] = useState(EngDialects.US);

  const onClickAudio = (event: React.MouseEvent<HTMLButtonElement>, lang: string) => {
    event.stopPropagation();

    if (userRole === RoleName.USER_ENGLISH) {
      const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
      const voices = window.speechSynthesis.getVoices();
      const maleVoices = voices.filter((voice) => voice.name.includes('Male') && voice.lang.includes(lang));
      const femaleVoices = voices.filter((voice) => voice.name.includes('Female') && voice.lang.includes(lang));
      const randomVoice = Math.random() < 0.5 ? maleVoices[getRandomInt(0, maleVoices.length - 1)] : femaleVoices[getRandomInt(0, femaleVoices.length - 1)];

      const utterance = new SpeechSynthesisUtterance(word.wordDataDto.nameEnglish);
      utterance.voice = randomVoice;
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    }
    if (userRole === RoleName.USER_CHINESE) {
      const utterance = new SpeechSynthesisUtterance(word.wordDataDto.nameChinese);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    }
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    switch (userRole) {
      case RoleName.USER_ENGLISH: {
        onClickAudio(event, engDialect);
        setEngDialect((prevState) => (prevState === EngDialects.US ? EngDialects.GB : EngDialects.US));
        return;
      }
      case RoleName.USER_CHINESE: {
        onClickAudio(event, 'zh-CN');
        return;
      }
      default:
        return null;
    }
  };

  return <ButtonWithIcon type={ButtonWithIconType.AUDIO} onClick={onClick} />;
}
