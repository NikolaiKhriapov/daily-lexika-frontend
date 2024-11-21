import { createContext, ReactNode, useEffect, useState } from 'react';
import { detect } from 'detect-browser';

let deferredPrompt: any;

type ContextProps = {
  deferredPrompt: any;
  isPwaInstallable: boolean;
  setPwaInstallable: any;
  isIos: boolean;
  isIosOrMacOs: boolean;
  isStandalone: boolean;
};

const AppInstallationContext = createContext<ContextProps>({
  deferredPrompt: null,
  isPwaInstallable: false,
  setPwaInstallable: () => {},
  isIos: false,
  isIosOrMacOs: false,
  isStandalone: true,
});

type Props = {
  children: ReactNode;
};

function AppInstallationProvider(props: Props) {
  const { children } = props;
  const browser = detect();

  const [isPwaInstallable, setPwaInstallable] = useState(false);

  /* not Apple */
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      setPwaInstallable(true);
    });
  }, []);

  /* Apple */
  const [isIos, setIos] = useState(false);
  const [isMacOs, setMacOs] = useState(false);
  const [isIosOrMacOs, setIosOrMacOs] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  const checkIsIos = () => browser?.os === 'iOS';
  const checkIsMacOs = () => browser?.os === 'Mac OS';
  // const checkIsIos = () => detectOS('iOS');
  // const checkIsMacOs = () => detectOS('Mac');

  useEffect(() => {
    setIos(checkIsIos());
    setMacOs(checkIsMacOs());
    setIosOrMacOs(isIos || isMacOs);
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true);
    }
  }, [isIos, isMacOs]);

  return (
    <AppInstallationContext.Provider value={{ deferredPrompt, isPwaInstallable, setPwaInstallable, isIos, isIosOrMacOs, isStandalone }}>
      {children}
    </AppInstallationContext.Provider>
  );
}

export { AppInstallationProvider, AppInstallationContext };
