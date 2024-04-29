import { createContext, ReactNode, useEffect, useState } from 'react';
import { detectOS } from '@chakra-ui/utils';

let deferredPrompt: any;

type ContextProps = {
  deferredPrompt: any;
  isPwaInstallable: boolean;
  setPwaInstallable: any;
  isIosOrMacOs: boolean;
  isStandalone: boolean;
};

const PwaContext = createContext<ContextProps>({
  deferredPrompt: null,
  isPwaInstallable: false,
  setPwaInstallable: () => {},
  isIosOrMacOs: false,
  isStandalone: true,
});

type Props = {
  children: ReactNode;
};

function PwaProvider(props: Props) {
  const { children } = props;
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
  const [isStandalone, setIsStandalone] = useState(false); // State for standalone mode

  const checkIsIos = () => detectOS('iOS');
  const checkIsMacOs = () => detectOS('Mac');

  useEffect(() => {
    setIos(checkIsIos());
    setMacOs(checkIsMacOs());
    setIosOrMacOs(isIos || isMacOs);
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true);
    }
  }, [isIos, isMacOs]);

  return (
    <PwaContext.Provider value={{ deferredPrompt, isPwaInstallable, setPwaInstallable, isIosOrMacOs, isStandalone }}>
      {children}
    </PwaContext.Provider>
  );
}

export { PwaContext };
export default PwaProvider;
