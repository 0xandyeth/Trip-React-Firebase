import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import * as ROUTES from 'constants/routes';

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import SignupPage from "views/SignupPage/SignupPage.js";
import RequestSuitcasePage from "views/RequestSuitcasePage/RequestSuitcasePage.js";
import SubmitClinicPage from "views/SubmitClinicPage/SubmitClinicPage.js"
import AdminTrips from "views/AdminTrips/AdminTrips.js";
import AdminTripDetails from "views/AdminTripDetails/AdminTripDetails.js";
import ClinicPage from "views/ClinicPage/ClinicPage.js";
import TripDetails from "views/TravellerTrips/TripDetails.js";
import AboutUs from "views/AboutUs/AboutUs.js"
import DonateMedSupplies from "views/DonateMedSupplies/DonateMedSupplies.js"
import ContactUs from "views/ContactUs/ContactUs.js"
import StartChapter from "views/StartChapter/StartChapter.js"

import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

// Firebase
import { withAuthentication } from 'components/Session';

var hist = createBrowserHistory();

const dashboardRoutes = [];

const App = (props) => {

  return (
    <Router history={hist}>
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="NJT"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
        />
        <Switch>
          <Route exact path={ROUTES.HOME} component={LandingPage} />
          <Route path={ROUTES.ACCOUNT} component={ProfilePage} />
          <Route path={ROUTES.LOGIN} component={LoginPage} />
          <Route path={ROUTES.SIGN_UP} component={SignupPage} />
          <Route path={ROUTES.REQUEST_SUITCASE} component={RequestSuitcasePage} />
          <Route path={ROUTES.SUBMIT_CLINIC} component={SubmitClinicPage} />
          <Route path={ROUTES.ADMIN_TRIPS} component={AdminTrips} />
          <Route path={ROUTES.ADMIN_TRIP_DETAILS + '/:id'} component={AdminTripDetails} />
          <Route path={ROUTES.CLINIC_MAP} component={ClinicPage} />
          <Route path={ROUTES.TRIP_DETAILS + '/:id'} component={TripDetails} />
          <Route path={ROUTES.ABOUT_US} component={AboutUs} />
          <Route path={ROUTES.DONATE} component={DonateMedSupplies} />
          <Route path={ROUTES.CONTACT_US} component={ContactUs} />
          <Route path={ROUTES.START_CHAPTER} component={StartChapter} />
        </Switch>
      </div>
    </Router>
  )
}

export default withAuthentication(App);
