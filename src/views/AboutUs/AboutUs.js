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

function AboutUs(props) {
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
                    <h3 className={classes.title}>About Us</h3>
                  </div>
                  <div className={classes.description}>
                    Our project is about love. Through the work of
                    volunteers, we aspire to:
                      <ul>
                          <li>Change the way people travel and start the journey
                            for ordinary tourists to become humanitarians</li>
                         <li>Prevent the waste of usable medical supplies
                            and get them to those in most need</li>
                       </ul>
                    Not Just Tourists was founded with the purpose of getting
                    medical supplies to those who can’t afford them. Ordinary
                    tourists are given the means to change the lives of the
                    locals they visit. After seeing first-hand the serious
                    lack of medical supplies in Cuba in 1990, Dr. Ken Taylor
                    and his wife Denise—from St. Catharines, Ontario—started
                    taking medical supplies to remote areas in Cuba. Soon
                    others who were traveling to Cuba began approaching them to
                    take medical supplies too, and the Not Just Tourists
                    phenomenon started. <br/><br/>
                    Since it’s inception 25 years ago, it has spread with
                    chapters across Canada and over 10,000 suitcases
                    delivered to 82 countries.<br/><br/>
                    Not Just Tourists receives donations from
                    Canada’s largest hospitals, clinics, medical
                    suppliers and individuals. The supplies donated are
                    typically gauze, bandages, surgical instruments, masks,
                    gloves, antiseptics, IV kits, urinary supplies and
                    birthing kits. The supplies are packed by volunteers
                    into suitcases during weekly “packing parties”. Travellers
                    sign up and are given the suitcases to deliver to remote
                    clinics where they are needed. The project does not accept
                    funding, is non-political, non-religious. Everything is
                    accomplished through volunteers. <br/><br/>
                    Our Values:
                    <ul>
                      <li>We Are Collaborative</li>
                      <li>We Are Transparent</li>
                      <li>We Are Non-Bureaucratic</li>
                      <li>We Are Committed</li>
                      <li>We Are Inclusive</li>
                      <li>The Project Is About Love</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className={classes.title}>Our Principles</h3>
                  </div>
                  <div className={classes.description}>
                  Ever since conception in St. Catharines, Ontario over 25
                  years ago, Not Just Tourists has maintained a core set of
                  values when providing humanitarian services
                  to developing countries.<br/><br/>
                  Each Not Just Tourists branch within Canada
                  are to be guided by the following principles:
                  </div>
                  <h4 className={classes.subtitle}>Volunteer-Run</h4>
                  <div className={classes.description}>
                    Branches will be coordinated, monitored, and maintained
                    by volunteers.
                  </div>

                  <h4 className={classes.subtitle}>Not-For-Profit</h4>
                  <div className={classes.description}>
                    Branches will be categorized as, and continue to be,
                    not-for-profit organizations.
                  </div>

                  <h4 className={classes.subtitle}>Non-Political & Secular</h4>
                  <div className={classes.description}>
                    Branches will not express the viewpoint of or promote any
                    philosophy, political party, product, business,
                    religious organization, or group. However, individuals
                    may hold differing opinions.
                  </div>

                  <h4 className={classes.subtitle}>Co-Operative</h4>
                  <div className={classes.description}>
                    Different branches will respect and consider the impact
                    of various actions and policies on other groups, and
                    share potentially useful information.
                  </div>

                  <h4 className={classes.subtitle}>Donations</h4>
                  <div className={classes.description}>
                    Upon donation, all materials become the property of the
                    organization and are to be use solely for the purpose
                    of humanitarian aid.
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

export default AboutUs;
