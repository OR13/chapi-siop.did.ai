import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import Base from "../../../base/base";

import { Typography } from "@material-ui/core";

export const WalletProxyGet = (props) => {
  return (
    <Base>
      <Typography>
        Are you sure you want to provide website ABC, with credentials XYZ?
      </Typography>

      <Button
        variant={"contained"}
        onClick={() => {
          console.log("redirect....");
        }}
      >
        Yes
      </Button>
    </Base>
  );
};

WalletProxyGet.propTypes = {
  wallet: PropTypes.any,
};
