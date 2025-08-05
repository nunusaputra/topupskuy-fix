import { createContext, useContext, useState } from "react";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  return (
    <ScrollContext.Provider value={{ showScrollTop, setShowScrollTop }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
