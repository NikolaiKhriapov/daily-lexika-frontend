import React, { useEffect, useState } from 'react';
import { useGetUserQuery } from '@daily-lexika/store/api/userAPI';
import { RoleName, WordDto } from '@library/daily-lexika';
import { ButtonWithIcon, ButtonWithIconType } from '@library/shared/ui';
import { Locale } from '@library/shared/utils';

type Props = {
  word: WordDto;
};

export function ButtonsPronunciation(props: Props) {
  const { word } = props;

  const { data: user } = useGetUserQuery();
  const [engDialect, setEngDialect] = useState(Locale.EN_US);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const availableVoices = window.speechSynthesis.getVoices();
    setVoices(availableVoices);

    if (window.speechSynthesis.onvoiceschanged !== null) {
      window.speechSynthesis.onvoiceschanged = () => {
        setVoices(window.speechSynthesis.getVoices());
      };
    }
  }, []);

  const userRole = user!.role!;

  const onClickAudio = (event: React.MouseEvent<HTMLButtonElement>, lang: string) => {
    event.stopPropagation();

    window.speechSynthesis.cancel();

    if (userRole === RoleName.USER_ENGLISH) {
      const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
      const availableVoices = voices.length ? voices : window.speechSynthesis.getVoices();
      const maleVoices = availableVoices.filter((voice) => voice.name.includes('Male') && voice.lang.includes(lang));
      const femaleVoices = availableVoices.filter((voice) => voice.name.includes('Female') && voice.lang.includes(lang));

      let randomVoice;
      if (maleVoices.length > 0 && femaleVoices.length > 0) {
        randomVoice = Math.random() < 0.5
          ? maleVoices[getRandomInt(0, maleVoices.length - 1)]
          : femaleVoices[getRandomInt(0, femaleVoices.length - 1)];
      } else if (availableVoices.length > 0) {
        const matchingVoices = availableVoices.filter(voice => voice.lang.includes(lang));
        if (matchingVoices.length > 0) {
          [randomVoice] = matchingVoices;
        }
      }

      const utterance = new SpeechSynthesisUtterance(word.wordDataDto.nameEnglish);
      if (randomVoice) {
        utterance.voice = randomVoice;
      }
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    }
    if (userRole === RoleName.USER_CHINESE) {
      const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
      const availableVoices = voices.length ? voices : window.speechSynthesis.getVoices();
      const maleVoices = availableVoices.filter((voice) => voice.name.includes('Male') && voice.lang.includes(lang));
      const femaleVoices = availableVoices.filter((voice) => voice.name.includes('Female') && voice.lang.includes(lang));

      let randomVoice;
      if (maleVoices.length > 0 && femaleVoices.length > 0) {
        randomVoice = Math.random() < 0.5
          ? maleVoices[getRandomInt(0, maleVoices.length - 1)]
          : femaleVoices[getRandomInt(0, femaleVoices.length - 1)];
      } else if (availableVoices.length > 0) {
        const googleVoices = availableVoices.filter(voice => voice.lang.includes(lang) && voice.name.includes("Google"));
        if (googleVoices.length > 0) {
          [randomVoice] = googleVoices;
        } else {
          const matchingVoices = availableVoices.filter(voice => voice.lang.includes(lang));
          if (matchingVoices.length > 0) {
            [randomVoice] = matchingVoices;
          }
        }
      }

      const utterance = new SpeechSynthesisUtterance(word.wordDataDto.nameChinese);
      utterance.lang = lang;
      if (randomVoice) {
        utterance.voice = randomVoice;
      }
      utterance.rate = 0.8;

      window.speechSynthesis.speak(utterance);
    }
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    switch (userRole) {
      case RoleName.USER_ENGLISH: {
        onClickAudio(event, engDialect);
        setEngDialect((prevState) => (prevState === Locale.EN_US ? Locale.EN_GB : Locale.EN_US));
        return;
      }
      case RoleName.USER_CHINESE: {
        onClickAudio(event, Locale.CN);
        return;
      }
      default:
        return null;
    }
  };

  return <ButtonWithIcon type={ButtonWithIconType.AUDIO} onClick={onClick} />;
}
