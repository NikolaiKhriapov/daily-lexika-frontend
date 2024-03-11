import React from 'react';
import { useGetUserInfoQuery } from '@store/api/userAPI';
import { RoleName } from '@utils/constants';
import { WordDto } from '@utils/types';
import ButtonWithIcon, { ButtonWithIconType } from '@components/common/basic/ButtonWithIcon';

type Props = {
  word: WordDto;
};

export default function ButtonsPronunciation(props: Props) {
  const { word } = props;

  const { data: user } = useGetUserInfoQuery();
  const userRole = user!.role!;

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
      window.speechSynthesis.speak(utterance);
    }
    if (userRole === RoleName.USER_CHINESE) {
      const utterance = new SpeechSynthesisUtterance(word.wordDataDto.nameChineseSimplified);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {userRole === RoleName.USER_ENGLISH && (
        <>
          <ButtonWithIcon type={ButtonWithIconType.AUDIO} onClick={(event: React.MouseEvent<HTMLButtonElement>) => onClickAudio(event, 'en-US')} />
          <ButtonWithIcon type={ButtonWithIconType.AUDIO} onClick={(event: React.MouseEvent<HTMLButtonElement>) => onClickAudio(event, 'en-GB')} />
        </>
      )}
      {userRole === RoleName.USER_CHINESE && (
        <ButtonWithIcon type={ButtonWithIconType.AUDIO} onClick={(event: React.MouseEvent<HTMLButtonElement>) => onClickAudio(event, 'zh-CN')} />
      )}
    </>
  );
}
