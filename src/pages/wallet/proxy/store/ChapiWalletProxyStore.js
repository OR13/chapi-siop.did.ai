import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import Base from "../../../base/base";

import { Typography } from "@material-ui/core";

export const ChapiWalletProxyStore = (props) => {
  return (
    <Base>
      <Typography>
        Are you sure you want to save credentials XYZ from website ABC?
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

ChapiWalletProxyStore.propTypes = {
  wallet: PropTypes.any,
};
