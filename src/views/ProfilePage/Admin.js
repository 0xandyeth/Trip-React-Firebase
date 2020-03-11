import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Check from "@material-ui/icons/Check";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

// Authorization
import { AuthUserContext, withAuthorization, helpers } from 'components/Session';
import { withFirebase } from 'components/Firebase';

import profile from "assets/img/faces/christian.jpg";
import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

function Admin(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  // Requests
  useEffect(() => {
    props.firebase.getChapters().onSnapshot(snapshot => {
      let chapterList = [];
      snapshot.forEach(doc => chapterList.push({ ...doc.data(), uid: doc.id }));
      const selectedChapter = props.authUser.chapter ? chapterList.filter(chapter => chapter.uid === props.authUser.chapter.id)[0].name : "Select a Chapter";
      setChapterList(chapterList);
      setSelectedChapter(selectedChapter);
    });
  }, []);

  const [chapterList, setChapterList] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("");

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.profile}>
              <div>
                <img src={profile} alt="..." className={imageClasses} />
              </div>
              <div className={classes.name}>
                <h3 className={classes.title}>{helpers.getFullName(authUser)}</h3>
                <h6>ADMIN</h6>
              </div>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <div className={classes.description}>
              <p>{`First Name: ${authUser.firstName}`}</p>
              <p>{`Last Name: ${authUser.lastName}`}</p>
              <p>{`Email: ${authUser.email}`}</p>
              <p>Chapter: {
                <CustomDropdown
                  buttonText={selectedChapter}
                  dropdownList={chapterList.map(chapter => chapter.name)}
                  onClick={(value) => {
                    setSelectedChapter(value);
                    const chapterId = chapterList.filter(chapter => chapter.name === value)[0].uid;
                    // update DB
                    props.firebase.user(authUser.uid)
                      .set({ chapter: props.firebase.db.doc(`chapters/${chapterId}`) }, { merge: true });
                  }}
                />
              }</p>
            </div>
          </GridItem>
        </GridContainer>
      )}
    </AuthUserContext.Consumer>
  );
}

export default withFirebase(Admin);
