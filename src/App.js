import logo from './logo.svg';
import './App.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useEffect, useState } from 'react';
import { Auth0LockPasswordless } from 'auth0-lock';
import {clientId,domain} from './envConfig.js'

function App() {
  const [phone, setPhone] = useState(0)
  console.log(phone)
  var accessToken = null;
  var profile = null;
  var options = {
    passwordlessMethod:"code", 
    allowedConnections:["sms"],
    languageDictionary: {
      title: "",
      passwordlessSMSInstructions:
        "Enter your mobile or email to sign in or request an account",
    },
    theme:{
        primaryColor: "#70C9BB",
        logo:"https://www.botmd.io/images/logo.svg"

    }
}
  var lock = new Auth0LockPasswordless(clientId,domain, options)
  
  useEffect(()=>{
    lock.show()
    lock.on("authenticated", function(authResult) {
      lock.getUserInfo(authResult.accessToken, function(error, profileResult) {
        if (error) {
          
          console.log("No such user")
          return;
        }
    
        accessToken = authResult.accessToken;
        profile = profileResult;
        console.log(accessToken)
        console.log(profile)
        console.log("success")
      });
    });
  },[])
  

  


  return (
    <div className="App">
    <div className="App-header">
    

    </div>
    </div>
  );
}

export default App;
