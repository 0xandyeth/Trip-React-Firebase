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

import styles from "assets/jss/material-kit-react/views/infoPages.js";

import Contact from "./Contact.js"

const useStyles = makeStyles(styles);

function AboutUs(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const njtContacts = [
    {
      location: "Calgary",
      emails: [
        {
          desc: "Email",
          addr: "calgary@njt.net"
        }
      ]
    },
    {
      location: "Toronto",
      emails: [
        {
          desc: "General",
          addr: "toronto@njt.net"
        },
        {
          desc: "Travel Coordinator",
          addr: "travellers.to@njt.net"
        },
        {
          desc: "Volunteer Coordinator",
          addr: "volunteer.to@njt.net"
        },
        {
          desc: "Medical Supply Donations",
          addr: "a.dsouza@njt.net"
        },
        {
          desc: "Outreach and Partnerships",
          addr: "j.landry@njt.net"
        }
      ]
    }
  ]

  return (
    <div>
      <Parallax small filter image={require("assets/img/profile-bg.jpg")}/>
      <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
          <div className={classes.section}>
              <GridContainer justify="center">
                <GridItem xs={6}>
                  <div>
                    <h3 className={classes.title}>Contact Us</h3>
                  {
                    njtContacts.map(contact =>
                      <div key={contact.location}>
                        <Contact location={contact.location} emails={contact.emails} />
                      </div>
                    )
                  }
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
