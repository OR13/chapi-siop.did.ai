import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { vp } from "../../../../fixtures";

const base64url = require("base64url");
const queryString = require("query-string");

const { WebCredentialHandler, credentialHandlerPolyfill } = window;

export const WalletFrameGet = (props) => {
  const [state, setState] = React.useState({
    // credential: { data: vp.verifiableCredential[0] },
  });

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

    console.log("Wallet processing get() event:", event);
    const cro = event.credentialRequestOptions.web.VerifiablePresentation;
    const query = Array.isArray(cro.query) ? cro.query[0] : cro.query;

    setState({
      ...state,
      event,
      query,
      vp,
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
              ? "Where would you like to provide this credential from?"
              : `Are you sure you want to present this vp to ${state.event.credentialRequestOrigin}`}
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
                This Wallet
              </Button>

              <Button
                variant={"contained"}
                color={"primary"}
                style={{ marginRight: "8px" }}
                onClick={async () => {
                  const event = await WebCredentialHandler.receiveCredentialEvent();
                  // this consumes the event!
                  const cro =
                    event.credentialRequestOptions.web.VerifiablePresentation;
                  const query = Array.isArray(cro.query)
                    ? cro.query[0]
                    : cro.query;

                  const encodedQuery = base64url.encode(JSON.stringify(query));
                  const offerUri = `${window.location.origin}/wallet/proxy/get?query=${encodedQuery}`;

                  // this approach won't work...
                  // window.location.href = url;
                  // you will be left in a frame without having
                  // provided a response to the requesting party...

                  // instead we return a VP... thats really a redirect request...
                  // which the RP can use to ask for the credential directly...

                  const vpRedirectRequest = {
                    type: "VerifiablePresentation",
                    holder: "did:example:123",
                    offerUri: offerUri,
                  };

                  event.respondWith(
                    Promise.resolve({
                      dataType: "VerifiablePresentation",
                      data: vpRedirectRequest,
                    })
                  );
                }}
              >
                Remote Wallet
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
                  Promise.resolve({
                    dataType: "VerifiablePresentation",
                    data: state.vp,
                  })
                );
              }}
            >
              Confirm
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          <pre>
            {JSON.stringify({ query: state.query, vp: state.vp }, null, 2)}
          </pre>
        </Grid>
      </Grid>
    </div>
  );
};

WalletFrameGet.propTypes = {
  wallet: PropTypes.any,
};
