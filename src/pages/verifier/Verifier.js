import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Base from "../base/base";
import { queryByExample } from "../../fixtures";
export const Verifier = (props) => {
  const [state, setState] = React.useState({});

  return (
    <Base>
      <Typography>
        This website wants you to present Verifiable Credentials.
      </Typography>
      <br />
      <br />
      <Button
        variant={"contained"}
        onClick={async () => {
          const result = await navigator.credentials.get(queryByExample);
          setState({
            ...state,
            result,
          });
        }}
      >
        Provide Credentials
      </Button>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </Base>
  );
};

Verifier.propTypes = {
  wallet: PropTypes.any,
};
