import { createContext, ReactNode, useEffect, useState } from 'react';

let deferredPrompt: any;

type ContextProps = {
  deferredPrompt: any;
  isPwaInstalled: boolean;
  setPwaInstalled: any;
};

const PwaContext = createContext<ContextProps>({
  deferredPrompt: null,
  isPwaInstalled: false,
  setPwaInstalled: () => {},
});

type Props = {
  children: ReactNode;
};

function PwaProvider(props: Props) {
  const { children } = props;
  const [isPwaInstalled, setPwaInstalled] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      setPwaInstalled(true);
    });
  }, []);

  return (
    <PwaContext.Provider value={{ deferredPrompt, isPwaInstalled, setPwaInstalled }}>
      {children}
    </PwaContext.Provider>
  );
}

export { PwaContext };
export default PwaProvider;
