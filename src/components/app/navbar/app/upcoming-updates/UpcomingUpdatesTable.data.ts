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
        { name: 'Custom combined word packs', progress: 0 },
        { name: 'Interface languages: RU, CN', progress: 0 },
        { name: 'Minor improvements', progress: 0 },
      ],
      [RoleName.USER_CHINESE]: [
        { name: 'Custom combined word packs', progress: 0 },
        { name: 'Interface languages: RU, CN', progress: 0 },
        { name: 'Updated translations for HSK 6-9', progress: 0 },
        { name: 'Minor improvements', progress: 0 },
      ],
    },
  },
  [FeaturePeriod.LONG_TERM]: {
    title: 'Long-Terms (3 months)',
    features: {
      [RoleName.USER_ENGLISH]: [
        { name: 'Daily reminders', progress: 0 },
        { name: 'Section \'Reading\'', progress: 0 },
        { name: 'Section \'Grammar\'', progress: 0 },
      ],
      [RoleName.USER_CHINESE]: [
        { name: 'Daily reminders', progress: 0 },
        { name: 'Section \'Reading\'', progress: 0 },
        { name: 'Section \'Grammar\'', progress: 0 },
        { name: 'Example sentences for HSK 1-9', progress: 0 },
        { name: 'Custom word packs by character', progress: 0 },
      ],
    },
  },
};
