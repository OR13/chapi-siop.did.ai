import React, { Component } from "react";
import PropTypes from "prop-types";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { darken, lighten } from "@material-ui/core/styles/colorManipulator";

import cyan from "@material-ui/core/colors/cyan";
import lime from "@material-ui/core/colors/lime";

const primaryColor = cyan["500"];
const secondaryColor = lime["500"];

class Theme extends Component {
  render() {
    const { children } = this.props;
    const theme = createMuiTheme({
      splashImage: "",
      palette: {
        type: "light",
        primary: {
          light: lighten(primaryColor, 0.07),
          main: primaryColor,
          dark: darken(primaryColor, 0.07),
        },
        secondary: {
          light: lighten(secondaryColor, 0.07),
          main: secondaryColor,
          dark: darken(secondaryColor, 0.07),
        },
      },
    });
    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
  }
}

Theme.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Theme;
