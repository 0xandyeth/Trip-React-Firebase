import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-react/views/infoPages.js";

const useStyles = makeStyles(styles);

function AddressItem(props) {
  const classes = useStyles();
  const {
    location,
    emails
  } = props

  return (
    <div>
      <h4 className={classes.subtitle}>NJT {location}</h4>
      <div className={classes.description}>
          {emails.map(email =>
            <div key={email.addr}>{email.desc}:{" "}
            <a href="mailto:${email.addr}">{email.addr}</a>
            </div>
          )}
      </div>
    </div>
  )
}

export default AddressItem;
