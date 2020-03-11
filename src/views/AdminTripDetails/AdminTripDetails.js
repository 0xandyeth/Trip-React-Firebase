import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { get } from 'lodash';
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import AutorenewIcon from '@material-ui/icons/Autorenew';

// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
import checkBoxStyles from "assets/jss/material-kit-react/customCheckboxRadioSwitch.js";

// firebase
import { withFirebase } from 'components/Firebase';

// Authorization
import * as ROLES from 'constants/roles';
import { AuthUserContext } from 'components/Session';

import profile from "assets/img/faces/christian.jpg";
import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);
const useStyles2 = makeStyles(checkBoxStyles);

function AdminTripDetails(props) {
  const classes = useStyles();
  const classes2 = useStyles2();
  const { ...rest } = props;
  const wrapperDiv = classNames(
    classes2.checkboxAndRadio,
    classes2.checkboxAndRadioHorizontal
  );

  useEffect(() => {
    const tripId = get(props, 'match.params.id', "");
   
    props.firebase.getAdminTripDetails(tripId)
      .then((res) => {
        setLoading(false);
        setTripDetails(res);
        console.log(res);
      });
  }, []);

  const [tripDetails, setTripDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const statusOrder = [
    {
      "key": "requested",
      "description": "Filled request to take a suitcase"
    },
    {
      "key": "availabilities",
      "description": "availabilities"
    },
    {
      "key": "confirmed_time",
      "description": "Confirmed suitcase pick-up date, time, and location with a NJT admin"
    },
    {
      "key": "picked_up",
      "description": "Received suitcases from NJT"
    },
    {
      "key": "printed_forms",
      "description": "Printed all travelling documents associated with NJT"
    },
    {
      "key": "delivered",
      "description": "Suitcases has been delivered"
    },
    {
      "key": "feedback",
      "description": "Feedback on the trip and process has been submitted"
    }
  ];

  const toDateTime = secs => {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const result = `${t.toLocaleDateString("en-US", options)} at ${t.toLocaleTimeString()}`;
    return result;
  };

  return (
    <AuthUserContext.Consumer>
      {authUser => authUser && authUser.roles[ROLES.ADMIN] && (
        <div>
          <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div>
              <div className={classes.container}>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={6}>
                    {!loading ? <div style={{ "paddingBottom": "30px" }}>
                      <h3 className={classes.title}>{`${tripDetails.firstName}'s Trip Details`}</h3>
                      <h3>Traveller's status</h3>
                      {statusOrder.map(status =>
                        <div className={wrapperDiv} key={status.key}>
                          <FormControlLabel
                            disabled
                            control={
                              <Checkbox
                                tabIndex={-1}
                                checked={get(tripDetails, `${status.key}.completed`, false)}
                                checkedIcon={<Check className={classes2.checkedIcon} />}
                                icon={<Check className={classes2.uncheckedIcon} />}
                                classes2={{ checked: classes2.checked }}
                              />
                            }
                            classes2={{
                              label: classes2.label,
                              disabled: classes2.disabledCheckboxAndRadio
                            }}
                            label={status.description}
                          />
                        </div>
                      )}
                      <h3>{`Traveller's Information`}</h3>
                      <h5>{`First name: ${tripDetails.firstName}`}</h5>
                      <h5>{`Last name: ${tripDetails.lastName}`}</h5>
                      <h5>{`Email: ${tripDetails.email}`}</h5>
                      <h5>{`Air line: ${tripDetails.airline_name}`}</h5>
                      <h5>{`Departure date: ${toDateTime(get(tripDetails, 'departure_date.seconds', ''))}`}</h5>
                      <h5>{`Return date: ${toDateTime(get(tripDetails, 'return_date.seconds', ''))}`}</h5>
                      <h5>{`Suitcase size: ${tripDetails.suitcase}`}</h5>
                      <h5>{`Supplies traveller is willing to carry:`}
                        {get(tripDetails, 'supplies', []).map(supply => <li key={supply}>{supply}</li>)}
                      </h5>
                    </div> :
                      <div style={{ "display": "flex", "flexFlow": "row", "alignItems": "center", "justifyContent": "center", "margin": "30px 0px" }}>
                        <AutorenewIcon />
                        <h4 className={classes.title} style={{ "margin": "0 5px", "minHeight": "0" }}>Loading...</h4>
                      </div>
                    }
                  </GridItem>
                </GridContainer>
              </div>
            </div>
          </div>
          <Footer />
        </div >
      )}
    </AuthUserContext.Consumer>
  );
}

export default withFirebase(AdminTripDetails);
