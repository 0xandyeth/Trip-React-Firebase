import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";

// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import AdminTripCards from "./AdminTripCards.js"

// Authorization
import * as ROLES from 'constants/roles';
import { AuthUserContext } from 'components/Session';

import profile from "assets/img/faces/christian.jpg";
import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

export default function AdminTrips(props) {
  const classes = useStyles();
  const { ...rest } = props;

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
                    <div>
                      <h3 className={classes.title}>Logs</h3>
                    </div>
                    <AdminTripCards authUser={authUser} />
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
