import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import Base from "../../../base/base";

import { Typography } from "@material-ui/core";

const base64url = require("base64url");
const queryString = require("query-string");

export const WalletProxyStore = (props) => {
  const [state, setState] = React.useState({
    vc: {
      type: [""],
    },
    from: "",
  });
  React.useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    const vc = JSON.parse(base64url.decode(parsed.vc));
    const from = new URL(parsed.redirect_uri);
    setState({
      ...parsed,
      from: from.origin,
      vc,
    });
  }, []);
  return (
    <Base>
      <Typography gutterBottom>
        Are you sure you want to save this credential:
      </Typography>
      <Typography gutterBottom>Offered by Type: {state.from}</Typography>
      <Typography gutterBottom>Credential Issuer: {state.vc.issuer}</Typography>
      <Typography gutterBottom>
        Credential Type: {state.vc.type.join(" ")}
      </Typography>

      <Button
        variant={"contained"}
        onClick={() => {
          console.log("redirect....");
          window.location.href = state.redirect_uri + "?status=accepted";
        }}
      >
        Yes
      </Button>
    </Base>
  );
};

WalletProxyStore.propTypes = {
  wallet: PropTypes.any,
};
