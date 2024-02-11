import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@context/AuthContext';
import { getAllWordData } from '@services/word-data';
import { Platform, RoleName } from '@utils/constants';
import { WordDataDTO } from '@utils/types';

type Props = {
  allWordDataDTO: WordDataDTO[];
  setAllWordDataDTO: Dispatch<SetStateAction<WordDataDTO[]>>;
  updateWordDataDTO: any;
  removeAccent: any;
};

const WordDataContext = React.createContext<Props>({
  allWordDataDTO: [],
  setAllWordDataDTO: () => {
  },
  updateWordDataDTO: () => {
  },
  removeAccent: () => {
  },
});

function WordDataProvider({ children }: { children: any }) {
  const { user } = useContext(AuthContext);
  const [allWordDataDTO, setAllWordDataDTO] = useState<WordDataDTO[]>([]);

  const fetchAllNotificationsDTO = () => {
    getAllWordData()
      .then((response) => {
        const { data } = response;
        const allWordData = data
          .filter((wordData) => (
            user?.role === RoleName.USER_ENGLISH
              ? wordData.platform === Platform.ENGLISH
              : wordData.platform === Platform.CHINESE))
          .sort(compareChineseNames);
        setAllWordDataDTO(allWordData);
      })
      .catch((e) => console.error(e.code, e.response.data.message));
  };

  useEffect(() => {
    fetchAllNotificationsDTO();
  }, []);

  const updateWordDataDTO = (updatedWordDataDTO: WordDataDTO) => {
    const index = allWordDataDTO.findIndex((wordData) => wordData.id === updatedWordDataDTO.id);
    if (index !== -1) {
      const updatedAllWordData = [...allWordDataDTO];
      updatedAllWordData[index] = updatedWordDataDTO;
      setAllWordDataDTO(updatedAllWordData);
    }
  };

  function removeAccent(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  function compareChineseNames(a: WordDataDTO, b: WordDataDTO) {
    const nameA = removeAccent(a.nameChineseSimplified).toLowerCase();
    const nameB = removeAccent(b.nameChineseSimplified).toLowerCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  }

  return (
    <WordDataContext.Provider value={{ allWordDataDTO, setAllWordDataDTO, updateWordDataDTO, removeAccent }}>
      {children}
    </WordDataContext.Provider>
  );
}

export { WordDataContext };
export default WordDataProvider;
