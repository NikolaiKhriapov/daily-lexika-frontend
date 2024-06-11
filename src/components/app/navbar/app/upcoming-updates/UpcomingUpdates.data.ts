import { RoleName, RoleNameBase } from '@utils/app/constants';
import { TFunction } from 'i18next';

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

export const upcomingUpdatesData = (featurePeriod: FeaturePeriod, t: TFunction<"translation", undefined>) => {
  const getFeatures = (period: string, language: string) => [
    {
      name: t(`UpcomingUpdatesTableData.${period}.features.${language}.one.name`),
      progress: Number(t(`UpcomingUpdatesTableData.${period}.features.${language}.one.progress`)),
    },
    {
      name: t(`UpcomingUpdatesTableData.${period}.features.${language}.two.name`),
      progress: Number(t(`UpcomingUpdatesTableData.${period}.features.${language}.two.progress`)),
    },
    {
      name: t(`UpcomingUpdatesTableData.${period}.features.${language}.three.name`),
      progress: Number(t(`UpcomingUpdatesTableData.${period}.features.${language}.three.progress`)),
    },
  ];

  const data: Record<FeaturePeriod, FeaturesColumn> = {
    [FeaturePeriod.SHORT_TERM]: {
      title: t('UpcomingUpdatesTableData.shortTerms.title'),
      features: {
        [RoleName.USER_ENGLISH]: getFeatures('shortTerms', 'english'),
        [RoleName.USER_CHINESE]: getFeatures('shortTerms', 'chinese'),
      },
    },
    [FeaturePeriod.LONG_TERM]: {
      title: t('UpcomingUpdatesTableData.longTerms.title'),
      features: {
        [RoleName.USER_ENGLISH]: getFeatures('longTerms', 'english'),
        [RoleName.USER_CHINESE]: getFeatures('longTerms', 'chinese'),
      },
    },
  };

  return data[featurePeriod];
};
