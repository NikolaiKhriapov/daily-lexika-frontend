import React, { useContext } from 'react';
import { AppInstallationContext } from '@library/shared/context';

import { PwaInstallAndroidComponent } from './PwaInstallAndroidComponent';
import { PwaInstallAppleComponent } from './PwaInstallAppleComponent';

export function PwaInstallComponent() {
  const { isPwaInstallable, isIosOrMacOs } = useContext(AppInstallationContext);

  return (
    isPwaInstallable
      ? <PwaInstallAndroidComponent />
      : isIosOrMacOs
        ? <PwaInstallAppleComponent />
        : <></>
  );
}
