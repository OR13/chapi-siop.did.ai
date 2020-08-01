import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { vp } from "../../../../fixtures";

const { WebCredentialHandler, credentialHandlerPolyfill } = window;

export const ChapiWindowGet = (props) => {
  const [state, setState] = React.useState({
    event: {},
    query: {},
  });
  React.useEffect(() => {
    credentialHandlerPolyfill.loadOnce().then(() => {
      if (!props.chapi.wallet.isLoaded) {
        props.loadWalletContents();
      }
    });
  }, []);

  React.useEffect(() => {
    async function handleGetEvent() {
      const event = await WebCredentialHandler.receiveCredentialEvent();
      console.log("Wallet processing get() event:", event);
      const vp = event.credentialRequestOptions.web.VerifiablePresentation;
      const query = Array.isArray(vp.query) ? vp.query[0] : vp.query;

      setState({
        ...state,
        event,
        query,
      });
    }
    credentialHandlerPolyfill.loadOnce().then(handleGetEvent);
  }, []);

  return (
    <React.Fragment>
      <Typography>ChapiWindowGet</Typography>
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
      <Button
        variant={"contained"}
        color={"primary"}
        onClick={() => {
          state.event.respondWith(
            Promise.resolve({
              dataType: "VerifiablePresentation",
              data: vp,
            })
          );
        }}
      >
        Confirm
      </Button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </React.Fragment>
  );
};

ChapiWindowGet.propTypes = {
  wallet: PropTypes.any,
};
