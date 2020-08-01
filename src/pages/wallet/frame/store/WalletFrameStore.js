import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { vp } from "../../../../fixtures";

const base64url = require("base64url");
const queryString = require("query-string");

const { WebCredentialHandler, credentialHandlerPolyfill } = window;

export const WalletFrameStore = (props) => {
  const [state, setState] = React.useState({
    credential: { data: vp.verifiableCredential[0] },
  });

  React.useEffect(() => {
    const handleStoreEvent = async () => {
      const event = await WebCredentialHandler.receiveCredentialEvent();
      console.log("Store Credential Event:", JSON.stringify(event, null, 2));

      const parsedQueryString = queryString.parse(window.location.search);

      if (parsedQueryString.status && parsedQueryString.status === "accepted") {
        console.log("Remote Wallet Accepted Credential.");
        return event.respondWith(
          new Promise((resolve) => {
            return resolve({ dataType: "Response", data: "result" });
          })
        );
      }

      const credential = event.credential;
      // Display the credential details, for confirmation
      const vp = credential.data;
      let vc;
      if (vp.verifiableCredential) {
        vc = Array.isArray(vp.verifiableCredential)
          ? vp.verifiableCredential[0]
          : vp.verifiableCredential;
      } else {
        vc = vp;
      }

      setState({
        ...state,
        event,
        credential,
        vc,
      });
    };

    credentialHandlerPolyfill.load().then(handleStoreEvent);
  }, []);
  return (
    <div style={{ padding: "8px" }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography gutterBottom>
            Where would you like to save this credential?
          </Typography>
          <Button
            variant={"contained"}
            color={"primary"}
            style={{ marginRight: "8px" }}
            onClick={() => {
              // store credential data... here... state.credential.data
              state.event.respondWith(
                new Promise((resolve) => {
                  return resolve({ dataType: "Response", data: "result" });
                })
              );
            }}
          >
            In This Wallet
          </Button>
          <Button
            variant={"contained"}
            color={"primary"}
            style={{ marginRight: "8px" }}
            onClick={() => {
              // store credential data... here... state.credential.data
              const args = `?redirect_uri=${
                window.location.href
              }&vc=${base64url.encode(JSON.stringify(state.credential.data))}`;
              window.location.href = "/wallet/proxy/store" + args;
            }}
          >
            In Remote Wallet
          </Button>
          <Button
            onClick={() => {
              state.event.respondWith(
                new Promise((resolve) => {
                  return resolve({ dataType: "Response", data: "canceled" });
                })
              );
            }}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={12}>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </Grid>
      </Grid>
    </div>
  );
};

WalletFrameStore.propTypes = {
  wallet: PropTypes.any,
};
