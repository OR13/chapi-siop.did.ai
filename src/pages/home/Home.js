import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import Base from "../base/base";

import history from "../../store/history";

export const Home = (props) => {
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
