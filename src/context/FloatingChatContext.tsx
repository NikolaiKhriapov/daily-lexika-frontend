import React, { createContext, useState } from 'react';

interface Props {
  isVisible: boolean;
  toggleVisibility: () => void;
  reToggleVisibility: () => void;
}

const FloatingChatContext = createContext<Props>({
  isVisible: false,
  toggleVisibility: () => {},
  reToggleVisibility: () => {},
});

function FloatingChatProvider({ children }: { children: any }) {
  const [isVisible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible((prevVisibility) => !prevVisibility);
  };

  const reToggleVisibility = () => {
    toggleVisibility();
    setTimeout(() => {
      toggleVisibility();
    }, 150);
  };

  return (
    <FloatingChatContext.Provider value={{ isVisible, toggleVisibility, reToggleVisibility }}>
      {children}
    </FloatingChatContext.Provider>
  );
}

export { FloatingChatContext };
export default FloatingChatProvider;
