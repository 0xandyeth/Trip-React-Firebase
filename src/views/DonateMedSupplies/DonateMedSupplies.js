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

function DonateMedSupplies(props) {
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
                    <h3 className={classes.title}>Donate Medical Supplies</h3>
                  </div>

                  <h4 className={classes.subtitle}>Trauma & Burn Supplies</h4>
                  <div className={classes.description}>
                    <ul>
                      <li>Vaccu-Splints, Full Body & Extremities</li>
                      <li>Speed Splints</li>
                      <li>4×4 or 2×2 Non-sterile Gauze2x2</li>
                      <li>4×4 or 2×2 Sterile gauze</li>
                      <li>Kling Rolls (4 & 6″)</li>
                      <li>Pressure/Jelonet Dressings</li>
                      <li>Trauma Abdo Pads</li>
                      <li>Cloth/Clear Medical Tape</li>
                      <li>Sager Splints</li>
                      <li>Burn Cream/Dressings</li>
                      <li>Eyepads</li>
                      <li>Ace Bandages and Bandaids</li>
                      <li>Cotton Swabs</li>
                      <li>Tongue depressors</li>
                      <li>Suture Kits/Tools (clamps)</li>
                      <li>Compress Bandages</li>
                      <li>Malleable Wrist Splints</li>
                      <li>Triangular bandages</li>
                      <li>Quick Clots</li>
                      <li>Tourniquets</li>
                    </ul>
                  </div>

                  <h4 className={classes.subtitle}>Emergency Medical Equipment</h4>
                  <div className={classes.description}>
                    <ul>
                      <li>Defibrilators</li>
                      <li>O2 cylinders, Regulators & Flow Meters</li>
                      <li>Bag Valve Masks</li>
                      <li>Flynn Rescusitator Masks Adult & Pediatric</li>
                      <li>Non-rebreathable and regular O2 masks</li>
                      <li>Pediatric Non-rebreather and regular O2 masks</li>
                      <li>Nasal Cannulas</li>
                      <li>Oral-Pharangeal Airway Kits</li>
                      <li>Nasal Airways Sets</li>
                      <li>Instant Glucose Packs</li>
                      <li>Glucometers</li>
                      <li>Combat Application Tourniquets</li>
                      <li>Combitubes</li>
                      <li>SteriStrips</li>
                      <li>Butterfly Dressings</li>
                      <li>Scissor Kits</li>
                      <li>Eyeshields</li>
                      <li>Rescue bags</li>
                      <li>Blankets (Emergency and Regular)</li>
                      <li>IV Kits</li>
                      <li>EndoTracheal Intubation Kits</li>
                      <li>Syringes</li>
                    </ul>
                  </div>

                  <h4 className={classes.subtitle}>Medical Exam & Clinical Equipment</h4>
                  <div className={classes.description}>
                    <ul>
                      <li>Stethescopes</li>
                      <li>BP Cuffs</li>
                      <li>Gloves</li>
                      <li>Pulse Oxymeters</li>
                      <li>Thermometers</li>
                      <li>Heart Monitors</li>
                      <li>Portable Examination Tables</li>
                      <li>Hospital Gowns</li>
                      <li>Surgical Masks and scrubs</li>
                      <li>Eye Goggles</li>
                      <li>Portable Sterilization Machines</li>
                      <li>Autoclaves</li>
                    </ul>
                  </div>

                  <h3 className={classes.subtitle}>Not Accepted Supplies</h3>
                  <div className={classes.description}>
                    <ul>
                      <li>Medicine, Narcotics or any other controlled
                      substances listed in <i>Schedules I to IV of the Controlled Drugs and Substances Act</i> </li>
                      <li>Clothing or educational materials</li>
                      <li>Expired liquids</li>
                      <li>Medical waste</li>
                    </ul>
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

export default DonateMedSupplies;
