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
  var options = {passwordlessMethod:"code", allowedConnections:["sms"]}
  var lock2 = new Auth0LockPasswordless(clientId,domain, options)
  
  lock2.show()

  // lock.on("authenticated", function(authResult) {
  //   lock.getUserInfo(authResult.accessToken, function(error, profileResult) {
  //     if (error) {
        
  //       // Handle error
  //       return;
  //     }
  
  //     accessToken = authResult.accessToken;
  //     profile = profileResult;
  
  //     // Update DOM
  //     lock.show();
  //   });
  // });


  return (
    <div className="App">
    <div className="App-header">
    

    </div>
    </div>
  );
}

export default App;
