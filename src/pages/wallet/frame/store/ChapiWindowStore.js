import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const { WebCredentialHandler, credentialHandlerPolyfill } = window;

export const ChapiWindowStore = (props) => {
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    const handleStoreEvent = async () => {
      const event = await WebCredentialHandler.receiveCredentialEvent();
      console.log("Store Credential Event:", JSON.stringify(event, null, 2));
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

    credentialHandlerPolyfill.loadOnce().then(handleStoreEvent);
  }, []);
  return (
    <React.Fragment>
      <Typography>ChapiWindowStore</Typography>
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
          // store credential data... here... state.credential.data
          state.event.respondWith(
            new Promise((resolve) => {
              return resolve({ dataType: "Response", data: "result" });
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

ChapiWindowStore.propTypes = {
  wallet: PropTypes.any,
};
