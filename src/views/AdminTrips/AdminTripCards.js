import React, { useState, useEffect } from "react";
import { get } from "lodash";
import { Link } from "react-router-dom";
import * as ROUTES from 'constants/routes';

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Badge from 'components/Badge/Badge.js';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

// @material-ui/icons
import AutorenewIcon from '@material-ui/icons/Autorenew';

// firebase
import { withFirebase } from 'components/Firebase';

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

function AdminTripCards(props) {
  const classes = useStyles();

  useEffect(() => {
    props.firebase.getAdminTrips(props.authUser.chapter)
      .then((res) => {
        setLoading(false);
        setTripList(res);
      });
  }, []);

  const toDateTime = secs => {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const result = `${t.toLocaleDateString("en-US", options)} at ${t.toLocaleTimeString()}`;
    return result;
  };

  const [tripList, setTripList] = useState([]);
  const [loading, setLoading] = useState(true);

  return !loading ? tripList.map(trip => (
    <Card key={trip.tripUid}>
      <CardBody>
        <span>
          <span style={{ "fontSize": "20px" }}>{`${trip.firstName} ${trip.lastName}`}</span>
          <span style={{ "float": "right" }}>
            {get(trip, 'availabilities.completed', false) && !get(trip, 'confirmed_time.completed', false) && <Badge color="danger">Action Required</Badge>}
          </span>
        </span>
        <p style={{ "marginTop": "10px", "marginBottom": "0" }}>{`Destination: ${trip.destination}`}</p>
        <p style={{ "marginTop": "0px" }}>{`Departure Date: ${toDateTime(get(trip, 'departure_date.seconds', ''))}`}</p>
        <Button
          color="primary"
          component={Link}
          to={`/admin-trip-details/${trip.tripUid}`}
        >
          View Details
        </Button>
      </CardBody>
    </Card >
  )) :
    <div style={{ "display": "flex", "flexFlow": "row", "alignItems": "center", "justifyContent": "center", "marginBottom": "30px" }}>
      <AutorenewIcon />
      <h4 className={classes.title} style={{ "margin": "0 5px", "minHeight": "0" }}>Loading...</h4>
    </div>
}
export default withFirebase(AdminTripCards);
