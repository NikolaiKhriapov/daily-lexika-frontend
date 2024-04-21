import { createContext, ReactNode, useEffect, useState } from 'react';

let deferredPrompt: any;

type ContextProps = {
  deferredPrompt: any;
  isPwaInstallable: boolean;
  setPwaInstallable: any;
};

const PwaContext = createContext<ContextProps>({
  deferredPrompt: null,
  isPwaInstallable: false,
  setPwaInstallable: () => {},
});

type Props = {
  children: ReactNode;
};

function PwaProvider(props: Props) {
  const { children } = props;
  const [isPwaInstallable, setPwaInstallable] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      setPwaInstallable(true);
    });
  }, []);

  return (
    <PwaContext.Provider value={{ deferredPrompt, isPwaInstallable, setPwaInstallable }}>
      {children}
    </PwaContext.Provider>
  );
}

export { PwaContext };
export default PwaProvider;
