import React, { useContext } from 'react';
import { PwaContext } from '@context/app/PwaContext';
import PwaInstallAndroidComponent from '@components/app/navbar/app/install-app/PwaInstallAndroidComponent';
import PwaInstallAppleComponent from '@components/app/navbar/app/install-app/PwaInstallAppleComponent';

export default function PwaInstallComponent() {
  const { isPwaInstallable, isIosOrMacOs, isStandalone } = useContext(PwaContext);

  return (
    !isStandalone
      ? (isPwaInstallable
        ? <PwaInstallAndroidComponent />
        : isIosOrMacOs
          ? <PwaInstallAppleComponent />
          : <></>
      ) : <></>
  );
}
