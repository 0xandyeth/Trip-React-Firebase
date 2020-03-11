import React from 'react';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import * as ROUTES from 'constants/routes';

const useStyles = makeStyles(styles);

const LoginButton = ({ firebase }) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.listItem}>
      <Button
        href={ROUTES.LOGIN}
        className={classes.registerNavLink}
        color="primary"
        round>
        Login
      </Button>
    </ListItem>
  );
}

export default LoginButton;
