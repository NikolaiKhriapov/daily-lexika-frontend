import { RoleName } from '@utils/app/constants';

export enum FeaturePeriod {
  SHORT_TERM = 'SHORT_TERM',
  LONG_TERM = 'LONG_TERM',
}

export interface Feature {
  name: string;
  progress: number;
}

export interface FeaturesColumn {
  title: string;
  features: Record<RoleName, Feature[]>;
}

export const upcomingUpdatesTableData: Record<FeaturePeriod, FeaturesColumn> = {
  [FeaturePeriod.SHORT_TERM]: {
    title: 'Short-Terms (1 month)',
    features: {
      [RoleName.USER_ENGLISH]: [
        { name: 'Covers for word packs', progress: 0 },
        { name: 'Word of the Day', progress: 0 },
        { name: 'Minor updates', progress: 50 },
      ],
      [RoleName.USER_CHINESE]: [
        { name: 'Updated translations', progress: 0 },
        { name: 'Covers for word packs', progress: 0 },
        { name: 'Word of the Day', progress: 0 },
        { name: 'Minor updates', progress: 50 },
      ],
      [RoleName.ADMIN]: [],
    },
  },
  [FeaturePeriod.LONG_TERM]: {
    title: 'Long-Terms (3 months)',
    features: {
      [RoleName.USER_ENGLISH]: [
        { name: 'Custom combined word packs', progress: 0 },
        { name: 'Interface languages: RU, CN', progress: 0 },
        { name: 'Section \'Grammar\'', progress: 0 },
      ],
      [RoleName.USER_CHINESE]: [
        { name: 'Custom combined word packs', progress: 0 },
        { name: 'Interface languages: RU, CN', progress: 0 },
        { name: 'Section \'Grammar\'', progress: 0 },
        { name: 'Custom word packs by character', progress: 0 },
      ],
      [RoleName.ADMIN]: [],
    },
  },
};
