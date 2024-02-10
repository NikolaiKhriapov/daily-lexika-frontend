import axios, { AxiosResponse } from 'axios';
import { ApiEndpointsWordPacks } from '@API/apiMethods';
import { LocalStorage } from '@utils/constants';
import { WordDTO, WordPackDTO } from '@utils/types';

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(LocalStorage.ACCESS_TOKEN)}`,
  },
});

export const getAllWordPacks = async (): Promise<AxiosResponse<WordPackDTO[]>> => {
  try {
    return await axios.get(ApiEndpointsWordPacks.getAllWordPacks(), getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getWordPack = async (wordPackName: string): Promise<AxiosResponse<WordPackDTO>> => {
  try {
    return await axios.get(ApiEndpointsWordPacks.getWordPack(wordPackName), getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllWordsForWordPack = async (wordPackName: string, page: number, size: number): Promise<AxiosResponse<WordDTO[]>> => {
  try {
    return await axios.get(ApiEndpointsWordPacks.getAllWordsForWordPack(wordPackName, page, size), getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createCustomWordPack = async (wordPackDTO: WordPackDTO): Promise<AxiosResponse<void>> => {
  try {
    return await axios.post(ApiEndpointsWordPacks.createCustomWordPack(), wordPackDTO, getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCustomWordPack = async (wordPackName: string): Promise<AxiosResponse<void>> => {
  try {
    return await axios.delete(ApiEndpointsWordPacks.deleteCustomWordPack(wordPackName), getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addWordToCustomWordPack = async (wordPackName: string, wordId: number): Promise<AxiosResponse<void>> => {
  try {
    return await axios.get(ApiEndpointsWordPacks.addWordToCustomWordPack(wordPackName, wordId), getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeWordFromCustomWordPack = async (wordPackName: string, wordId: number): Promise<AxiosResponse<void>> => {
  try {
    return await axios.get(ApiEndpointsWordPacks.removeWordFromCustomWordPack(wordPackName, wordId), getAuthConfig());
  } catch (error) {
    console.error(error);
    throw error;
  }
};
