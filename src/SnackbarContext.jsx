import React, { useState } from "react";

import Snackbar from "./Snackbar";

export const SnackbarContext = React.createContext();

export const SnackbarContextProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    isOpen: false,
    message: "",
  });

  const openSnackbar = (message) => setNotification({ isOpen: true, message });
  const closeSnackbar = () => setNotification({ isOpen: false, message: "" });

  return (
    <SnackbarContext.Provider
      value={{
        isOpen: notification.isOpen,
        message: notification.message,
        open: openSnackbar,
        close: closeSnackbar,
      }}
    >
      <Snackbar />
      {children}
    </SnackbarContext.Provider>
  );
};
