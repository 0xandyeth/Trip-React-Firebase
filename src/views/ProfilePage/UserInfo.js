import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
// @material-ui/icons
import Email from '@material-ui/icons/Email';

// core components
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomInput from "components/CustomInput/CustomInput.js";
// Custom hooksLibs
import { useFormFields } from "libs/hooksLibs";

// Authorization
import { AuthUserContext, withAuthorization, helpers } from 'components/Session';
// firebase
import { withFirebase } from 'components/Firebase';

import * as ROUTES from 'constants/routes';

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

function UserInfo(props) {
  const classes = useStyles();

    function displayInfo(authUser){
      return(
        <div>
          <div className={classes.cardTitle}>
            <h3>{helpers.getFullName(authUser)}</h3>
          </div>
          <div className={classes.cardSubtitle}>
            <ListItem>
               <ListItemIcon><Email /></ListItemIcon>
               <ListItemText primary={authUser.email} />
           </ListItem>
          </div>
        </div>
      )
    }

    return(
      <AuthUserContext.Consumer>
        {authUser => displayInfo(authUser)}
      </AuthUserContext.Consumer>
    )

}
export default UserInfo;
