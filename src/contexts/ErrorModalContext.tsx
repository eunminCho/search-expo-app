import React, { createContext, useState, useContext } from "react";

import ErrorModal from "../components/ErrorModal";

const ErrorModalContext = createContext<{ showError: () => void }>({
  showError: () => {},
});

export const ErrorModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);

  const showError = () => setVisible(true);

  const hideError = () => setVisible(false);

  return (
    <ErrorModalContext.Provider value={{ showError }}>
      {children}
      <ErrorModal visible={visible} onClose={hideError} />
    </ErrorModalContext.Provider>
  );
};

export const useErrorModal = () => {
  const context = useContext(ErrorModalContext);
  if (!context) {
    throw new Error("useErrorModal must be used within an ErrorModalProvider");
  }
  return context;
};
