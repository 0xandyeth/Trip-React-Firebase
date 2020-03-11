import React ,{useEffect,useState}from "react";

import { get } from 'lodash';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import { cardTitle } from "assets/jss/material-kit-react.js";
import dropbuttonStyles from "assets/jss/material-kit-react/dropbutton.js";


// Authorization
import { AuthUserContext, withAuthorization } from 'components/Session';

//connect firebase
import { withFirebase } from 'components/Firebase';

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

//date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//available time
import AvailableTimes from 'react-available-times';

import Select from "react-dropdown-select";

import profile from "assets/img/faces/BabbuMann.jpg";
import styles from "assets/jss/material-kit-react/views/profilePage.js";

import * as ROUTES from 'constants/routes';

import Collapsible from 'react-collapsible';
import { setConstantValue } from "typescript";
//load check mark image
import checkMarker from '../../assets/img/icon-mark.png'

const useStyles = makeStyles(styles);
const userStyle2 = makeStyles(dropbuttonStyles);

const cardStyles = {
  cardTitle,
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right"
  }
};

const options = [
  'Yes', 'No'
];


function AdminTrips(props) {
  const classes = useStyles();
  const classes2 = userStyle2();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const { ...rest } = props;
  const [objectArrayTime,setObjectArrayTime]=useState([]);
  const [tripDetail,setTripDetail]=useState({});
  const [open, setOpen] = useState(false);
  const [tripID,setTripID] = useState("");
  const [dropValue1,setDropValue1] = useState("Yes");
  const [dropValue2,setDropValue2]= useState("No");
  const [dropValue3,setDropValue3]= useState("No");
  const [dropValue4,setDropValue4]= useState("No");
  const [dropValue5,setDropValue5]= useState("No");
  const [dropValue6,setDropValue6]= useState("No");


  const [startDate, setStartDate] = useState(new Date());
  const [clinic,setClinic]=useState([]);
  const [check1,setCheck1]=useState(false);
  const [check2,setCheck2]=useState(false);
  const [check3,setCheck3]=useState(false);
  const [check4,setCheck4]=useState(false);
  const [check5,setCheck5]=useState(false);
  const [check6,setCheck6]=useState(false);


  useEffect(() => {
    const tripId = get(props, 'match.params.id', "");
    setTripID(tripId);
    props.firebase.getTripDetails(tripId)
      .then((res) => {
       
        if(res !=={}) {
          setTripDetail(res);
          console.log(res);
        };
      
      });
  
  }, []);
 
  useEffect(() => {
    
    props.firebase.getClinics()
      .then((res) => {
       if(res !=={}) setClinic(res);
       console.log(1231232)
       console.log(res);
      
      });
  }, []);

  function onSubmitRequest(){
  
    props.firebase.setRequestTripDetail(tripID,dropValue1);
    setCheck1(true); 
   
  }
  
  function onSubmitPrint(){
    
    props.firebase.setPrintTripDetail(tripID,dropValue4);
    setCheck4(true)

  }

  function onSubmitPickup(){
  
      props.firebase.setPrickupTripDetail(tripID,dropValue3);
      setCheck3(true)
   

  }

  function onSubmitFeedback(){

      props.firebase.setFeedbackTripDetail(tripID,dropValue6);
      setCheck6(true)

  }

  
  function onSubmitDelivered(){
    let Dclinic="";
    console.log(tripID)
    if(clinic !==[]) Dclinic=clinic[0].clinicUid;
      props.firebase.setDeliveredTripDetail(tripID,dropValue5,Dclinic);
     setCheck5(true)

  }

    
  function onSubmitAvailTime(){

        props.firebase.setAvailTimeTripDetail(tripID,dropValue2,objectArrayTime);
        setCheck2(true)

  }
  
  const handleClickOpen = () => {
    setOpen(true);
    setObjectArrayTime([]);
  };

  const handleClose = () => {
    setOpen(false);

  };

  function availableTimeFunction(selections){
    let objectArray=[];
    selections.forEach(({ start, end }) => {
      console.log('Start:', start, 'End:', end);
      let object={
        start_time:start,
        end_time:end
      }
      objectArray.push(object);
    });
    setObjectArrayTime(objectArray);

  }
  console.log(objectArrayTime);
  return (
    <div>
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                </div>
              </GridItem>
            </GridContainer>

            <div>
              {/* filtered cards by chapter */}
              <Card style={{ width: "100%" }}>
                <CardBody>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                     <h4 className={classes.cardTitle}>1. Request</h4>
                     {
                       check1 &&(
                        <img src={checkMarker}/>
                       )
                     }
                  
                  </div>
                 
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <p>Have you requested a suitcase?</p>
                      <Dropdown 
                      options={options} 
                      className={classes2.cusButton} 
                      value={dropValue1}
                      onChange={(Dvalue)=>setDropValue1(Dvalue.value)}
                      controlClassName={classes2.controlButton}/>
                  </div>
                  <div style={{paddingTop:20,textAlign:'right'}}>
                    <Button
                        color="primary"
                        size="sm"
                        rel="noopener noreferrer"
                        onClick={onSubmitRequest}
                      >Done
                      </Button>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div>
              {/* filtered cards by chapter */}
              <Card style={{ width: "100%" }}>
                <CardBody>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  
                  <h4 className={classes.cardTitle}>2. Set Time</h4>
                  {
                    check2&&(
                      <img src={checkMarker}/>
                    )
                  }
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <p>Have you set your avail?</p>
                      <Dropdown 
                      options={options} 
                      className={classes2.cusButton} 
                      value={dropValue2} 
                      onChange={(Dvalue)=>setDropValue2(Dvalue.value)}
                      controlClassName={classes2.controlButton}/>
                  
                  </div>
                  <div style={{paddingTop:20,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <Button
                        color="primary"
                        size="sm"
                        rel="noopener noreferrer"
                        onClick={handleClickOpen}
                      >Set Avail
                      </Button>
                      
                      <Button
                        color="primary"
                        size="sm"
                        rel="noopener noreferrer"
                        onClick={onSubmitAvailTime}
                      >Done
                      </Button>
                  </div>

                </CardBody>
              </Card>
            </div>

            <div>
              {/* filtered cards by chapter */}
              <Card style={{ width: "100%" }}>
                <CardBody>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h4 className={classes.cardTitle}>3. Pickup</h4>
                {
                    check3&&(
                      <img src={checkMarker}/>
                    )
                  }
                </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <p>Have you picked up suitcase?</p>
                      <Dropdown 
                      options={options} 
                      className={classes2.cusButton} 
                      value={dropValue3}
                      onChange={(Dvalue)=>setDropValue3(Dvalue.value)}
                      controlClassName={classes2.controlButton}/>
                  </div>
                  <div style={{paddingTop:20,textAlign:'right'}}>
                      <Button
                        color="primary"
                        size="sm"
                        rel="noopener noreferrer"
                        onClick={onSubmitPickup}
                      >Done
                      </Button>
                  </div>

                </CardBody>
              </Card>
            </div>

            <div>
              {/* filtered cards by chapter */}
              <Card style={{ width: "100%" }}>
                <CardBody>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h4 className={classes.cardTitle}>4. Print</h4>
                {
                    check4&&(
                      <img src={checkMarker}/>
                    )
                  }
                </div>
                 
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <p>Have you printed the forms?</p>
                      <Dropdown 
                      options={options} 
                      className={classes2.cusButton} 
                      value={dropValue4}
                      onChange={(Dvalue)=>setDropValue4(Dvalue.value)}
                      controlClassName={classes2.controlButton}/>
                  </div>
                  <div style={{paddingTop:20,textAlign:'right'}}>
                      <Button
                        color="primary"
                        size="sm"
                        rel="noopener noreferrer"
                        onClick={onSubmitPrint}
                      >Done
                      </Button>
                  </div>
                </CardBody>
              </Card>
            </div>

            <div>
              {/* filtered cards by chapter */}
              <Card style={{ width: "100%" }}>
                <CardBody>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h4 className={classes.cardTitle}>5. Delivered</h4>
                {
                    check5&&(
                      <img src={checkMarker}/>
                    )
                  }
                </div>

                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                     <p>Have you delivered to a suitcase?</p> 
                      <Dropdown 
                      options={options} 
                      className={classes2.cusButton} 
                      value={dropValue5} 
                      onChange={(Dvalue)=>setDropValue5(Dvalue.value)}
                      controlClassName={classes2.controlButton}/>
                  </div>
                <div style={{paddingTop:20,display:'flex',justifyContent:'space-between',alignItems: 'center',}}>
                 <div style={{display:'flex',justifyContent:'flex-first',alignItems:'center'}}>
                  <p style={{marginRight:5}}>
                    which clinic 
                  </p>
                  <Select
                   options={clinic}
                   searchable={true}
                   multi={false}
                   dropdownHeight="200px"
                   clearOnBlur={true}
                   color="#16917D"
                   clearable={true}
                   placeholder="Search Clinic" 
                   labelField="clinic_name"
                   onChange={(value)=>setClinic(value)}
                   />
                  </div>
                  <Button
                        color="primary"
                        size="sm"
                        rel="noopener noreferrer"
                        onClick={onSubmitDelivered}
                      >Done
                      </Button>
                 </div>
                </CardBody>
              </Card>
            </div>

            <div>
              {/* filtered cards by chapter */}
              <Card style={{ width: "100%" }}>
                <CardBody>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h4 className={classes.cardTitle}>6. Feedback</h4>
                {
                    check6&&(
                      <img src={checkMarker}/>
                    )
                  }
                </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <p>Have you completed feedback?</p>
                      <Dropdown 
                      options={options} 
                      className={classes2.cusButton} 
                      value={dropValue6} 
                      onChange={(Dvalue)=>setDropValue6(Dvalue.value)}
                      controlClassName={classes2.controlButton}/>
                  </div>
                  <div style={{paddingTop:20,textAlign:'right'}}>
                      <Button
                        color="primary"
                        size="sm"
                        rel="noopener noreferrer"
                        onClick={onSubmitFeedback}
                      >Done
                      </Button>
                  </div>

                </CardBody>
              </Card>
            </div>


            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <AvailableTimes
            weekStartsOn="monday"
            calendars={[
              {
                id: 'work',
                title: 'Work',
                foregroundColor: '#ff00ff',
                backgroundColor: '#f0f0f0',
                selected: true,
              },
              {
                id: 'private',
                title: 'My private cal',
                foregroundColor: '#666',
                backgroundColor: '#f3f3f3',
              },
            ]}
            onChange={(selections) => {
              availableTimeFunction(selections)
            }}
            onEventsRequested={({ calendarId, start, end, callback }) => {
            }}
            height={600}
            width={600}
            recurring={false}
            availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday','saturday','sunday']}
            availableHourRange={{ start: 0, end: 24 }}
          />
        </Dialog>

      <Footer />
    </div >
  );

}

export default withFirebase(AdminTrips);