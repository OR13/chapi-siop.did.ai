import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import * as chapi from "credential-handler-polyfill";
import * as WebCredentialHandler from "web-credential-handler";

import Base from "../base/base";

import history from "../../store/history";

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

  return (
    <Base>
      <Button
        variant={"contained"}
        onClick={() => {
          history.push("/issuer");
        }}
      >
        Get Credentials
      </Button>
      <br />
      <br />
      <Button
        variant={"contained"}
        onClick={() => {
          history.push("/verifier");
        }}
      >
        Verify Credentials
      </Button>
    </Base>
  );
};

Home.propTypes = {
  wallet: PropTypes.any,
};
