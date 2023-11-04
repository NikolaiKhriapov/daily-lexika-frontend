export interface RegistrationRequest {
    name: string;
    email: string;
    password: string;
}

export interface AuthenticationRequest {
    email: string;
    password: string;
}

export interface UserDTO {
    id: number;
    name: string;
    email: string;
    password: string;
    roles: string[];
    currentStreak: number;
    dateOfLastStreak: string;
    recordStreak: number;
}

export interface ReviewDTO {
    id: number;
    userId: number;
    maxNewWordsPerDay: number;
    maxReviewWordsPerDay: number;
    wordPackName: string;
    listOfWordId: number[];
    dateLastCompleted: string;
    dateGenerated: string;
}

export interface WordDTO {
    id: number;
    nameChineseSimplified: string;
    nameChineseTraditional: string;
    pinyin: string;
    nameEnglish: string;
    nameRussian: string;
    status: Status;
    currentStreak: number;
    totalStreak: number;
    occurrence: number;
    dateOfLastOccurrence: string;
    listOfReviewId: number[];
    listOfChineseCharacterId: number[];
    listOfWordPackNames: string[];
}

export enum Status {
    'NEW',
    'IN_REVIEW',
    'KNOWN',
}
