import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const prodConfig = {
  apiKey: process.env.REACT_APP_PROD_API_KEY,
  authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
  projectId: process.env.REACT_APP_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
};
const devConfig = {
  // apiKey: process.env.REACT_APP_DEV_API_KEY,
  // authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
  // projectId: process.env.REACT_APP_DEV_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,

  apiKey: "AIzaSyCooo1YO7bBY4v5a_x2HJGPyiEGxD6DJj0",
  authDomain: "njt-dev.firebaseapp.com",
  databaseURL: "https://njt-dev.firebaseio.com",
  projectId: "njt-dev",
  storageBucket: "njt-dev.appspot.com",
  messagingSenderId: "1038124261115",
  appId: "1:1038124261115:web:d5bfd103a95f4153cd5a5e"

};
const config =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

config['userProfile'] = 'users';
config['useFirestoreForProfile'] = true;

class Firebase {
  constructor() {
    app.initializeApp(config);

    // Helper
    this.fieldValue = app.firestore.fieldValue;

    this.auth = app.auth();
    this.db = app.firestore();

    this.user = this.user.bind(this);
    this.chapter = this.chapter.bind(this);
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // ***USERS***
  user = uid => this.db.doc(`users/${uid}`);
  users = () => this.db.collection('users');
  addTripToUser = (uid, tripRef) => {
    return this.user(uid)
      .set(
        {
          trips: [tripRef]
        },
        { merge: true }
      )
  }

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();

            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** OTHER APIs ***

  // ***CHAPTERS***
  // get chapters
  getChapters = () => this.db.collection('chapters');
  chapter = (id) => this.db.doc(`chapters/${id}`);

  // ***TRIPS***
  // get trips and users for admin
  async getAdminTrips(chapter) {
    var result = [];
    let tripsRef = await this.db.collection('trips').where('chapter', '==', chapter).get();
    for (var trip of tripsRef.docs) {
      let data = { ...trip.data(), tripUid: trip.id };
      const userId = trip.data().user.id;
      let userRef = await this.db.doc(`users/${userId}`).get();
      data = { ...data, ...userRef.data(), userUid: userRef.id };
      result.push(data);
    }
  
    return result;
  }

  async getAdminTripDetails(tripId) {
    let tripRef = await this.db.doc(`trips/${tripId}`).get();
    const userId = tripRef.data().user.id;
    let userRef = await this.db.doc(`users/${userId}`).get();
    return {
      ...userRef.data(),
      ...tripRef.data(),
      userUid: userRef.ida,
      tripUid: tripRef.id
    };
  }

  //get tripDetail
  async getTripDetails(tripId){
       
      let tripsRef = await this.db.doc(`tripDetails/${tripId}`).get();
       return{        
           ...tripsRef.data()
       }

  }

    //get clinics
   async getClinics(){
      var clinics=[];
      let clinicRef=await this.db.collection('clinics').get();
      for(var clinic of clinicRef.docs){
        let data = { ...clinic.data(),
                    clinicUid:clinic.id};
        clinics.push(data);
      }
      return clinics;
    }

  // trips by userId
  tripsByUser = (uid) => {
    const userRef = this.user(uid)
    return this.db.collection('trips')
      .where('user', '==', userRef)
  }

  // write new trip data to "trip" collection
  setNewTrip = (uid, tripData) => {
    const userRef = this.user(uid)
    const chapterRef = this.chapter(tripData.chapterId)
    return this.db.collection('trips').add({
      airline_name: tripData.airline,
      comments: tripData.comments,
      departure_date: tripData.departureDate,
      destination: tripData.destination,
      return_date: tripData.returnDate,
      supplies: tripData.supplies,
      suitcase: tripData.suitcase,
      user: userRef,
      chapter: chapterRef,
      requested: {
        completed: true
      }
    });
  }
  
  //write new Trip detail request data to "tripDetails" collection
  setRequestTripDetail =(tripID,requestValue) =>{
     let completed=true;
     if(requestValue !== 'Yes') completed=false;
      let tripDetailRef = this.db.collection('tripDetails').doc(tripID);
      tripDetailRef.get()
      .then(doc => {
        if (!doc.exists) {
          return this.db.collection('tripDetails').doc(tripID).set({
            requested:{
              completed:completed
            }
        });
        } else {
          return this.db.collection('tripDetails').doc(tripID).update({
            requested:{
              completed:completed
            }
        });
        }
  })
  .catch(err => {
    console.log('Error getting document', err);
    return {};
  });
     

  }

   //write new Trip detail print data to "tripDetails" collection
   setPrintTripDetail=(tripID,printValue) =>{
    let completed=true;
    if(printValue !== 'Yes') completed=false;

    let tripDetailRef = this.db.collection('tripDetails').doc(tripID);
    tripDetailRef.get()
    .then(doc => {
      if (!doc.exists) {
        return this.db.collection('tripDetails').doc(tripID).set({
          printed_forms:{
            completed:completed
          }
      });   
      } else {
        return this.db.collection('tripDetails').doc(tripID).update({
          printed_forms:{
            completed:completed
          }
      });   
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
      return {};
    });
    
   }

   //write new Trip detail pick up to "tripDetails" collection
   setPrickupTripDetail=(tripID,pickValue) =>{
    let completed=true;
    if(pickValue !== 'Yes') completed=false;

    let tripDetailRef = this.db.collection('tripDetails').doc(tripID);
    tripDetailRef.get()
    .then(doc => {
      if (!doc.exists) {
        return this.db.collection('tripDetails').doc(tripID).set({
          picked_up:{
              completed:completed
            }
        });   
      } else {
        return this.db.collection('tripDetails').doc(tripID).update({
          picked_up:{
              completed:completed
            }
        });   
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
      return {};
    });



    
   }

   // write new Trip detail feedback to "tripDetails" collection

   setFeedbackTripDetail=(tripID,feedbackValue)=>{

    let completed=true;
    if(feedbackValue !== 'Yes') completed=false;
      
    let tripDetailRef = this.db.collection('tripDetails').doc(tripID);
    tripDetailRef.get()
    .then(doc => {
      if (!doc.exists) {
        return this.db.collection('tripDetails').doc(tripID).set({
          feedback:{
              completed:completed,
              feedback:""
            }
        });   
    
      } else {
        return this.db.collection('tripDetails').doc(tripID).update({
          feedback:{
              completed:completed,
              feedback:""
            }
        });   
    
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
      return {};
    });
      

   
   }

   // write new Trip detail delivered to "tripDetails" collection

   setDeliveredTripDetail=(tripID,deliverValue,dClinic)=>{

    let completed=true;
    if(deliverValue !== 'Yes') completed=false;

    let tripDetailRef = this.db.collection('tripDetails').doc(tripID);
    tripDetailRef.get()
    .then(doc => {
      if (!doc.exists) {
        return this.db.collection('tripDetails').doc(tripID).set({
          delivered:{
              clinic:`/clinics/${dClinic}`,
              completed:completed
            }
        });   
    
      } else {
        return this.db.collection('tripDetails').doc(tripID).update({
          delivered:{
              clinic:`/clinics/${dClinic}`,
              completed:completed
            }
        });   
    
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
      return {};
    });

   }

   // write new Trip detail confirmed time to "tripDetails" collection

   setAvailTimeTripDetail=(tripID,confirmTimeValue,objectArrayTime)=>{

    let completed=true;
    if(confirmTimeValue !== 'Yes') completed=false;
    let tripDetailRef = this.db.collection('tripDetails').doc(tripID);
    tripDetailRef.get()
    .then(doc => {
      if (!doc.exists) {
        return this.db.collection('tripDetails').doc(tripID).set({
          availabilities:{
              completed:completed,
              time:objectArrayTime
            }
        });   
    
      } else {
        return this.db.collection('tripDetails').doc(tripID).update({
          availabilities:{
              completed:completed,
              time:objectArrayTime
            }
        });   
    
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
      return {};
    });

 

   }

  // ***CLINIC***
  setNewClinic = (clinicInfo) => {
    return this.db.collection('clinics')
    .doc(clinicInfo.place_id).set({
      ...clinicInfo
    })
  }
  clinics = () => this.db.collection('users');



}
export default Firebase;
