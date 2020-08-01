import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Base from "../base/base";
import * as chapi from "credential-handler-polyfill";
import { vp } from "../../fixtures";

export const Issuer = (props) => {
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    (async () => {
      try {
        await chapi.loadOnce();
      } catch (e) {
        console.error("Error in loadOnce:", e);
      }
    })();
  }, []);
  return (
    <Base>
      <Typography>
        This website is offering you a Verifiable Credential.
      </Typography>
      <br />
      <br />
      <Button
        variant={"contained"}
        onClick={async () => {
          const webCredentialWrapper = new global.WebCredential(
            "VerifiablePresentation",
            vp
          );
          // Use Credential Handler API to store
          const result = await navigator.credentials.store(
            webCredentialWrapper
          );
          console.log("Result of receiving via store() request:", result);
          setState({ ...state, result });
        }}
      >
        Receive Credentials
      </Button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </Base>
  );
};

Issuer.propTypes = {
  wallet: PropTypes.any,
};
