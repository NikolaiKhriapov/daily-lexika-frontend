import { RoleName, RoleNameBase } from '@utils/app/constants';

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
  features: Record<RoleNameBase, Feature[]>;
}

export const upcomingUpdatesTableData: Record<FeaturePeriod, FeaturesColumn> = {
  [FeaturePeriod.SHORT_TERM]: {
    title: 'Short-Terms (1 month)',
    features: {
      [RoleName.USER_ENGLISH]: [
        { name: 'Word of the Day', progress: 100 },
        { name: 'Speech recognition', progress: 100 },
        { name: 'Minor updates', progress: 90 },
      ],
      [RoleName.USER_CHINESE]: [
        { name: 'Updated translations for HSK 4-9', progress: 15 },
        { name: 'Word of the Day', progress: 100 },
        { name: 'Minor updates', progress: 90 },
      ],
    },
  },
  [FeaturePeriod.LONG_TERM]: {
    title: 'Long-Terms (3 months)',
    features: {
      [RoleName.USER_ENGLISH]: [
        { name: 'Custom combined word packs', progress: 0 },
        { name: 'Interface languages: RU, CN', progress: 0 },
        { name: 'Section \'Search\'', progress: 100 },
        { name: 'Section \'Reading\'', progress: 0 },
        // { name: 'Section \'Grammar\'', progress: 0 },
      ],
      [RoleName.USER_CHINESE]: [
        { name: 'Custom combined word packs', progress: 0 },
        { name: 'Interface languages: RU, CN', progress: 0 },
        { name: 'Section \'Search\'', progress: 100 },
        { name: 'Section \'Reading\'', progress: 0 },
        // { name: 'Section \'Grammar\'', progress: 0 },
        // { name: 'Example sentences for HSK 1-9', progress: 20 },
        // { name: 'Custom word packs by character', progress: 0 },
      ],
    },
  },
};
