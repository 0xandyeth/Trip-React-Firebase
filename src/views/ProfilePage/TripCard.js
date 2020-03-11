import React, { useState } from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
// @material-ui/icons
import Event from '@material-ui/icons/Event';

// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

// Authorization
import { AuthUserContext, withAuthorization, helpers } from 'components/Session';
// firebase
import { withFirebase } from 'components/Firebase';

import * as ROUTES from 'constants/routes';

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

function TripCard(props) {
  const classes = useStyles();

  const {
    destination,
    date,
    status,
    tripId
  } = props;

  return (
      <Card>
        <CardBody>
          <h4 className={classes.cardTitle}>
            Trip to {destination}
          </h4>
          <ListItem>
            <ListItemIcon><Event /></ListItemIcon>
            <ListItemText primary={date.toString()} />
          </ListItem>
          <p>Status: {status}</p>
          <Button
            color="primary"
            component={Link} to={`${ROUTES.TRIP_DETAILS}/${tripId}`}>
            View Details
          </Button>
        </CardBody>
      </Card>
  )
}
export default TripCard;
