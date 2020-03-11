import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import * as ROLES from 'constants/roles';

import styles from "assets/jss/material-kit-react/views/infoPages.js";

const useStyles = makeStyles(styles);

function StartChapter(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Parallax small filter image={require("assets/img/profile-bg.jpg")}/>
      <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
          <div className={classes.section}>
              <GridContainer justify="center">
                <GridItem xs={6}>
                  <div>
                    <h3 className={classes.title}>Start a Chapter</h3>
                  </div>
                  <div className={classes.description}>
                    Interested in starting a chapter of Not Just Tourist
                    in your city? <br/><br/>
                    NJT is 100% volunteer driven and does
                    not accept any financial donations. Each chapter is
                    started by passionate people who believe they can
                    make a difference for those in need and the environment.
                    Starting a chapter is a significant commitment with lots
                    of hard work, but is tremendously fulfilling​.
                    Please contact us at {" "}
                    <a href="mailto:info@njt.net">info@njt.net</a> for more information!
                  </div>
                </GridItem>
              </GridContainer>
            </div>
          </div>
      </div>
      <Footer />
    </div>
  )
}

export default StartChapter;
