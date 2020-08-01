import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Base from "../base/base";
import * as chapi from "credential-handler-polyfill";

const vp = {
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  type: ["VerifiablePresentation"],
  holder: "did:key:z6MkjRagNiMu91DduvCvgEsqLZDVzrJzFrwahc4tXLt9DoHd",
  verifiableCredential: [
    {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1",
      ],
      id: "http://example.gov/credentials/3732",
      type: ["VerifiableCredential", "UniversityDegreeCredential"],
      issuer: "did:elem:ropsten:EiBJJPdo-ONF0jxqt8mZYEj9Z7FbdC87m2xvN0_HAbcoEg",
      issuanceDate: "2020-03-10T04:24:12.164Z",
      credentialSubject: {
        id: "did:elem:ropsten:EiBJJPdo-ONF0jxqt8mZYEj9Z7FbdC87m2xvN0_HAbcoEg",
        degree: {
          type: "BachelorDegree",
          name: "Bachelor of Science and Arts",
        },
      },
      proof: {
        type: "Ed25519Signature2018",
        created: "2020-04-23T17:32:33Z",
        verificationMethod:
          "did:elem:ropsten:EiBJJPdo-ONF0jxqt8mZYEj9Z7FbdC87m2xvN0_HAbcoEg#xqc3gS1gz1vch7R3RvNebWMjLvBOY-n_14feCYRPsUo",
        proofPurpose: "assertionMethod",
        jws:
          "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..LXvT0jxpIL6mj7JB2OX3XYi2KLqVzN1VsiA-pyjN_cl544Hf34febTVspoK_iUt-L3Y46FsWjz8KVsJGjOSUCw",
      },
    },
  ],
  proof: {
    type: "Ed25519Signature2018",
    created: "2020-04-23T17:40:22Z",
    verificationMethod:
      "did:elem:ropsten:EiBJJPdo-ONF0jxqt8mZYEj9Z7FbdC87m2xvN0_HAbcoEg#xqc3gS1gz1vch7R3RvNebWMjLvBOY-n_14feCYRPsUo",
    proofPurpose: "authentication",
    challenge: "99612b24-63d9-11ea-b99f-4f66f3e4f81a",
    domain: "issuer.example.com",
    jws:
      "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..8Jpe8pq7b_WUVgzkKZijXVPlJ91_mIWJMmFWzUNX-c_CzMhL-I1colNQKH_ckN-R6sWelbFB0VKyMaXH8emSBg",
  },
};

export const Issuer = (props) => {
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
      Issuer
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
        }}
      >
        Save Credential To Wallet
      </Button>
    </Base>
  );
};

Issuer.propTypes = {
  wallet: PropTypes.any,
};
