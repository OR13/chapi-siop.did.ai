import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import Base from "../../../base/base";

import { Typography } from "@material-ui/core";

const base64url = require("base64url");
const queryString = require("query-string");

export const WalletProxyGet = (props) => {
  const [state, setState] = React.useState({
    query: {},
    from: "",
  });
  React.useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    const query = JSON.parse(base64url.decode(parsed.query));
    const from = new URL(parsed.redirect_uri);
    setState({
      ...parsed,
      from: from.origin,
      query,
    });
  }, []);

  return (
    <Base>
      <Typography gutterBottom>
        Are you sure you want to provide:
        <Button
          variant={"contained"}
          color={"secondary"}
          style={{ float: "right" }}
          onClick={() => {
            const fakeIdToken =
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
            window.location.href =
              state.redirect_uri + `?id_token=${fakeIdToken}`;
          }}
        >
          Present Credentials
        </Button>
      </Typography>

      <Typography gutterBottom>Requesting Party: {state.from}</Typography>
      <Typography gutterBottom>Requesting Party Query:</Typography>
      <pre>{JSON.stringify(state.query, null, 2)}</pre>
    </Base>
  );
};

WalletProxyGet.propTypes = {
  wallet: PropTypes.any,
};
