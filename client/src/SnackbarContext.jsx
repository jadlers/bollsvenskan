import React, { Component } from "react";

import Snackbar from "./Snackbar";

export const SnackbarContext = React.createContext();

export class SnackbarContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      isOpen: false,
    };

    this.openSnackbar = this.openSnackbar.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  openSnackbar(message) {
    this.setState({
      message,
      isOpen: true,
    });
  }

  closeSnackbar() {
    this.setState({
      message: "",
      isOpen: false,
    });
  }

  render() {
    const { children } = this.props;

    return (
      <SnackbarContext.Provider
        value={{
          open: this.openSnackbar,
          close: this.closeSnackbar,
          isOpen: this.state.isOpen,
          message: this.state.message,
        }}
      >
        <Snackbar />
        {children}
      </SnackbarContext.Provider>
    );
  }
}
