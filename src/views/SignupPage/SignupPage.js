import React, { useState } from "react";
import { Link, withRouter } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

import * as ROUTES from 'constants/routes';
import * as ROLES from 'constants/roles'

// Custom hooksLibs
import { useFormFields } from "libs/hooksLibs";

// Firebase
import { withFirebase } from 'components/Firebase';

const useStyles = makeStyles(styles);

const SignUpPage = (props) => {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");

  const initialState = {
    email: "",
    pass1: "",
    pass2: "",
    firstName: "",
    lastName: ""
  }

  const [fields, handleFieldChange, resetFields] = useFormFields(initialState);
  const [error, setError] = useState(null);

  const roles = {};

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.pass1.length > 0 &&
      fields.pass1 === fields.pass2 &&
      fields.firstName.length > 0 &&
      fields.lastName.length > 0
    );
  }

  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  function onSubmit(e) {
    const { email, pass1, firstName, lastName } = fields;
    // is a njt user
    if (fields.email.includes("@njt.net")){
      roles[ROLES.ADMIN] = ROLES.ADMIN
    }

    props.firebase
      .doCreateUserWithEmailAndPassword(email, pass1)
      .then(authUser => {
        return props.firebase
          .user(authUser.user.uid)
          .set({
            email,
            firstName,
            lastName,
            roles
          })
      })
      .then(() => {
        // TODO: reset fields - this currently does not work
        // fields.resetFields(initialState)
        props.history.push(ROUTES.ACCOUNT);
      })
      .catch(error => {
        setError(null)
        setError(error)
        console.log(error)
      });
    e.preventDefault();
  }

  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Sign Up</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or Be Classical</p>
                  { error &&
                    <SnackbarContent
                     message={error.message}
                     close
                     color="danger"
                     icon="info_outline"/>
                   }
                  <CardBody>
                    <CustomInput
                      value={fields.firstName}
                      labelText="First Name..."
                      id="firstName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: (e) => handleFieldChange(e),
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      value={fields.lastName}
                      labelText="Last Name..."
                      id="lastName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: (e) => handleFieldChange(e),
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      value={fields.email}
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: (e) => handleFieldChange(e),
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      value={fields.pass2}
                      labelText="Password"
                      id="pass1"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: (e) => handleFieldChange(e),
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                    <CustomInput
                      value={fields.pass2}
                      labelText="Confirm Password"
                      id="pass2"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: (e) => handleFieldChange(e),
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button size="lg"
                      href={ROUTES.LOGIN}>
                      Login In
                    </Button>
                    <Button
                      disabled={!validateForm()}
                      color="primary" size="lg"
                      onClick={onSubmit}>
                      Sign Up
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}

export default withRouter(withFirebase(SignUpPage));
