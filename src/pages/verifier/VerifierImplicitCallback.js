import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import Base from "../base/base";
const base64url = require("base64url");
const queryString = require("query-string");

export const VerifierImplicitCallback = (props) => {
  const [state, setState] = React.useState({});
  const parsedQueryString = queryString.parse(window.location.search);

  React.useEffect(() => {
    if (parsedQueryString.id_token) {
      const [
        encodedHeader,
        encodedPayload,
        signature,
      ] = parsedQueryString.id_token.split(".");
      const result = {
        header: JSON.parse(base64url.decode(encodedHeader)),
        payload: JSON.parse(base64url.decode(encodedPayload)),
        signature,
      };
      setState({
        id_token: result,
      });
    }
  }, [parsedQueryString]);
  return (
    <Base>
      <Typography>Received Credentials</Typography>
      <br />
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </Base>
  );
};

VerifierImplicitCallback.propTypes = {
  wallet: PropTypes.any,
};
