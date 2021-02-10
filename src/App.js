import logo from './logo.svg';
import './App.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useEffect, useState } from 'react';
import { Auth0LockPasswordless } from 'auth0-lock';
import {clientId,domain} from './envConfig.js'
import {createStore} from 'redux'; //created globalized state
import allReducers from './reducers/indexReducer';


//STORE -> Globalized state
//ACTION -> the action you want to do. Like increment. (I'm hungry) a function tt return object
//Reducer -> how action transform state into next state. Reducer check action n update store.
//DISPATCH -> dispatch action to reducer.
function App() {
  const [phone, setPhone] = useState(0)
  const [loginStatus, setLoginStatus] = useState(false)
  const [token, setToken] = useState()
  
  var accessToken = null;
  var profile = null;
  var hello = "Welcome to midnight"
  //Options for configuring autho0 view
  var options = {
    passwordlessMethod:"code", 
    allowedConnections:["sms"],
    languageDictionary: {
      title: "",
      passwordlessSMSInstructions:
        "For login support issues, please contact customersupport@botmd,io",
    },
    theme:{
        primaryColor: "#70C9BB",
        logo:"https://www.botmd.io/images/logo.svg"

    },
  }
  var lock = new Auth0LockPasswordless(clientId,domain, options) //This has to come after options
  //Authenticate users
  useEffect(()=>{
    let store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //store needed to pass in reducer
     //Does the callback need to be async?
    lock.on("authenticated", function (authResult) {
      lock.getUserInfo(authResult.accessToken, function(error, profileResult) {
        if (error) {
          console.log("No such user")
          return;
        }    
        accessToken = authResult.accessToken;
        profile = profileResult;
        setToken(accessToken)
        setLoginStatus(true)
        console.log(accessToken)
        console.log(profile)
        console.log("success")
        store.dispatch(loginStateAction()) //Will trigger action dispatch
        store.dispatch(loginProfile(), profile) //Trying to pass my profile parameter here didn't work
      });
    });
  },[])

  
//Action
const loginProfile = () => {
  return{
    type:'LOGIN_USER'
  }
}

const loginStateAction = () =>{
  return{
    type:"LOGGED_IN"
  }
}

// store.subscribe(()=>console.log(`${store.getState()}`))




  return (
    <div className="App">
    <div className="App-header">
      {lock.show()}
    </div>
    </div>
  );
}

export default App;
