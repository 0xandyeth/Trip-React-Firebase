import React from 'react';
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar"

// Firebase
import { withFirebase } from 'components/Firebase';

// core components
import Button from "components/CustomButtons/Button.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import * as ROUTES from 'constants/routes';
import * as ROLES from 'constants/roles';
import { AuthUserContext } from 'components/Session';

const useStyles = makeStyles(styles);

const ProfileButton = (props) => {
  const classes = useStyles();
  const { initials } = props;

  function getSignInLinks(authUser) {
    let links = [];

    links.push(
      (
        <Link to={ROUTES.ACCOUNT} className={classes.dropdownLink}>
          Profile
      </Link>
      )
    )

    if (authUser.roles[ROLES.ADMIN]) {
      links.push(
        <Link to={ROUTES.ADMIN_TRIPS} className={classes.dropdownLink}>
          Admin Logs
        </Link>
      )
    } else {
      links.push(
        (<Link to={ROUTES.REQUEST_SUITCASE} className={classes.dropdownLink}>
          Take a Suitcase
        </Link>),
        (<Link to={ROUTES.SUBMIT_CLINIC} className={classes.dropdownLink}>
          Submit a Clinic
        </Link>)
      )
    }

    links.push(
      (<Link
        to="#"
        onClick={props.firebase.doSignOut}
        className={classes.dropdownLink}
        color="transparent">
        Sign Out
      </Link>)
    )

    return links
  }

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            left
            caret={false}
            hoverColor="black"
            buttonText={
              <Avatar
                className={classes.img, classes.avatar}
                alt="profile">
                {initials}
              </Avatar>
            }
            buttonProps={{
              className:
                classes.navLink + " " + classes.imageDropdownButton,
              color: "transparent"
            }}
            dropdownList={getSignInLinks(authUser)}
          />
        </ListItem>
      )}
    </AuthUserContext.Consumer>
  );
}

export default withFirebase(ProfileButton);
