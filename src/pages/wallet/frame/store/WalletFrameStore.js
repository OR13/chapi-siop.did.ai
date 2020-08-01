import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const base64url = require("base64url");
const queryString = require("query-string");

const { WebCredentialHandler, credentialHandlerPolyfill } = window;

export const WalletFrameStore = (props) => {
  const [state, setState] = React.useState({});

  const parsedQueryString = queryString.parse(window.location.search);

  const handleCancel = async () => {
    await credentialHandlerPolyfill.loadOnce();
    const event = await WebCredentialHandler.receiveCredentialEvent();
    event.respondWith(
      new Promise((resolve) => {
        return resolve({
          dataType: "Response",
          data: "canceled",
        });
      })
    );
  };

  const handleThisWallet = async () => {
    await credentialHandlerPolyfill.loadOnce();
    const event = await WebCredentialHandler.receiveCredentialEvent();
    console.log(
      "handleThisWallet Store Credential Event:",
      JSON.stringify(event, null, 2)
    );
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

  const handleRemoteWallet = async () => {
    // This code block is not possible, since receiveCredentialEvent has already
    // been consumed... however... we don't actually NEED to reply, we just need
    // escape UI...
    // await credentialHandlerPolyfill.loadOnce();
    // const event = await WebCredentialHandler.receiveCredentialEvent();
    // console.log(
    //   "handleRemoteWallet Store Credential Event:",
    //   JSON.stringify(event, null, 2)
    // );
    // event.respondWith(
    //   new Promise((resolve) => {
    //     return resolve({ dataType: "Response", data: "result" });
    //   })
    // );
    setState({
      done: true,
    });
  };

  React.useEffect(() => {
    if (parsedQueryString.status && parsedQueryString.status === "accepted") {
      console.log("Remote Wallet Accepted Credential.");
      handleRemoteWallet();
    }
  }, [parsedQueryString]);

  if (state.done) {
    return (
      <Typography gutterBottom style={{ padding: "8px" }}>
        Close this window. We're done here.
      </Typography>
    );
  }

  return (
    <div style={{ padding: "8px" }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography gutterBottom>
            {!state.event
              ? "Where would you like to save this credential?"
              : `Are you sure you want to save this credential to ${window.location.origin}`}
          </Typography>
          {!state.event ? (
            <React.Fragment>
              <Button
                variant={"contained"}
                color={"primary"}
                style={{ marginRight: "8px" }}
                onClick={() => {
                  handleThisWallet();
                  // store credential data... here... state.credential.data
                }}
              >
                In This Wallet
              </Button>

              <Button
                variant={"contained"}
                color={"primary"}
                style={{ marginRight: "8px" }}
                onClick={async () => {
                  // this consumes the event!
                  // no (nice) way out of CHAPI now!
                  const event = await WebCredentialHandler.receiveCredentialEvent();
                  const credential = event.credential;
                  const encodedVc = base64url.encode(
                    JSON.stringify(credential.data)
                  );
                  const args = `?redirect_uri=${window.location.href}&vc=${encodedVc}`;
                  window.location.href = "/wallet/proxy/store" + args;
                }}
              >
                In Remote Wallet
              </Button>
              <Button
                onClick={() => {
                  handleCancel();
                }}
              >
                Cancel
              </Button>
            </React.Fragment>
          ) : (
            <Button
              variant={"contained"}
              color={"primary"}
              style={{ marginRight: "8px" }}
              onClick={() => {
                state.event.respondWith(
                  new Promise((resolve) => {
                    return resolve({ dataType: "Response", data: "result" });
                  })
                );
              }}
            >
              Confirm
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          <pre>{JSON.stringify({ event: state.event }, null, 2)}</pre>
        </Grid>
      </Grid>
    </div>
  );
};

WalletFrameStore.propTypes = {
  wallet: PropTypes.any,
};
