import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Button from "components/CustomButtons/Button.js";

// routes
import * as ROUTES from 'constants/routes';

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function JoinUsSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Join Us Today</h2>
          <h5 className={classes.description}>
            NJT is 100% volunteer run, we operate without a budget and do not accept nor solicit financial donations.
            Here{"'"}s how you can help:
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={3}>
            <InfoArea
              title="Carry Supplies"
              description="Deliver medical supplies to a needy clinic on your vacation. We provide the suitcase, medical supplies and letters."
              icon={FlightTakeoffIcon}
              iconColor="info"
              vertical
            />
            <Button
              href={ROUTES.REQUEST_SUITCASE}
              color="primary"
              target="_blank"
            >Learn More
            </Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <InfoArea
              title="Pack Supplies"
              description="Join the cause! Help us pick up, sort and pack medical supplies, contact travellers, speak to groups and respond to emails."
              icon={CardTravelIcon}
              iconColor="success"
              vertical
            />
            <Button
              href={ROUTES.VOLUNTEER}
              color="primary"
              target="_blank"
            >Learn More
            </Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <InfoArea
              title="Donate Supplies"
              description="We accept sealed: Bandages, syringes, tapes, gowns, masks, gloves, IV kits, urinary , surgical, equipment."
              icon={MonetizationOnIcon}
              iconColor="warning"
              vertical
            />
            <Button
              href={ROUTES.DONATE}
              color="primary"
              target="_blank"
            >Learn More
            </Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <InfoArea
              title="Submit a Clinic"
              description="Submit a foreign non-profit clinic in need. We will do our best to get much needed medical supplies to them."
              icon={StoreMallDirectoryIcon}
              iconColor="danger"
              vertical
            />
            <Button
              href={ROUTES.SUBMIT_CLINIC}
              color="primary"
              target="_blank"
            >Learn More
            </Button>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
