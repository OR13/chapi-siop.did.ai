import React from "react";
import PropTypes from "prop-types";

import Base from "../base/base";

import * as chapi from "credential-handler-polyfill";
import * as WebCredentialHandler from "web-credential-handler";

export const Home = (props) => {
  React.useEffect(() => {
    if (!window.__chapi__run__once) {
      (async () => {
        try {
          await chapi.loadOnce();
          const WALLET_LOCATION = window.origin;
          const workerUrl = `${WALLET_LOCATION}/worker.html`;
          const registration = await WebCredentialHandler.installHandler({
            url: workerUrl,
          });
          await registration.credentialManager.hints.set("test", {
            name: "TestUser",
            enabledTypes: [
              "VerifiablePresentation",
              "VerifiableCredential",
              "UniversityDegreeCredential",
            ],
          });
          console.log("Wallet registered.");
        } catch (e) {
          console.error("Error in loadOnce:", e);
        }
      })();
    }
    window.__chapi__run__once = true;
  });

  return <Base>hello</Base>;
};

Home.propTypes = {
  wallet: PropTypes.any,
};
