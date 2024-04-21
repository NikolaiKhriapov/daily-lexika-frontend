import { createContext, ReactNode, useEffect, useState } from 'react';
import { detectOS } from '@chakra-ui/utils';

let deferredPrompt: any;

type ContextProps = {
  deferredPrompt: any;
  isPwaInstallable: boolean;
  setPwaInstallable: any;
  isIOsOrMacOs: boolean;
};

const PwaContext = createContext<ContextProps>({
  deferredPrompt: null,
  isPwaInstallable: false,
  setPwaInstallable: () => {},
  isIOsOrMacOs: false,
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
  const [isIOs, setIOs] = useState(false);
  const [isMacOs, setMacOs] = useState(false);
  const [isIOsOrMacOs, setIOsOrMacOs] = useState(false);

  const checkIsIos = () => detectOS('iOS');
  const checkIsMacOs = () => detectOS('Mac');

  useEffect(() => {
    setIOs(checkIsIos());
    setMacOs(checkIsMacOs());
    setIOsOrMacOs(isIOs || isMacOs);
  }, [isIOs, isMacOs]);

  return (
    <PwaContext.Provider value={{ deferredPrompt, isPwaInstallable, setPwaInstallable, isIOsOrMacOs }}>
      {children}
    </PwaContext.Provider>
  );
}

export { PwaContext };
export default PwaProvider;
