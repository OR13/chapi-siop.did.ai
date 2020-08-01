import React from "react";
import PropTypes from "prop-types";

import Base from "../base/base";

const { credentialHandlerPolyfill } = window;

export const Home = (props) => {
  React.useEffect(() => {
    credentialHandlerPolyfill.loadOnce().then(() => {
      console.log("CHAPI is loaded.");
    });
  }, []);

  return <Base>hello</Base>;
};

Home.propTypes = {
  wallet: PropTypes.any,
};
