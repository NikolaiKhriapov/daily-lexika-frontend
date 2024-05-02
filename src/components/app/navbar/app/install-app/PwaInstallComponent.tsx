import React, { useContext } from 'react';
import { AppInstallationContext } from '@context/app/AppInstallationContext';
import PwaInstallAndroidComponent from '@components/app/navbar/app/install-app/PwaInstallAndroidComponent';
import PwaInstallAppleComponent from '@components/app/navbar/app/install-app/PwaInstallAppleComponent';

export default function PwaInstallComponent() {
  const { isPwaInstallable, isIosOrMacOs } = useContext(AppInstallationContext);

  return (
    isPwaInstallable
      ? <PwaInstallAndroidComponent />
      : isIosOrMacOs
        ? <PwaInstallAppleComponent />
        : <></>
  );
}
