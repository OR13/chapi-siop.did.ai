import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Base from "../../base/base";
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
    <Base>
      <Typography>ChapiWindowStore</Typography>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </Base>
  );
};

ChapiWindowStore.propTypes = {
  wallet: PropTypes.any,
};
