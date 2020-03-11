import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
// import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
// import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

import * as ROUTES from 'constants/routes';

// Sections for this page
import ClinicMapSection from "./Sections/ClinicMapSection.js";

// const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function ClinicPage(props) {
    const classes = useStyles();
    const { ...rest } = props;
    return (
      <div>
        <Parallax filter image={require("assets/img/profile-bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>List Of Clinics For Delivery</h1>
                <h4>
                  Please SELECT the Country and City you are visiting to view a list of clinics you can deliver supplies to. Scroll to the bottom of this page (below the map) to see all the clinic details.
                </h4>
                <br />
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ClinicMapSection />
          </div>
        </div>
        <Footer />
      </div>
  );
}
