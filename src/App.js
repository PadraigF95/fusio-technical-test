import React from 'react'

import Login from './components/Login';
import Dashboard from './components/Dashboard'
import Registration from './components/Registration';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



const App = () => {
  return (
      <div className='app__container'
      >
  
      
          <div className='app__routes'>
              <Router>
                  <AuthProvider>
                      <Switch>
                          
                            <Route exact path="/" component={Dashboard} />
                            <Route path="/registration" component={Registration} />
                            <Route path="/login" component={Login} />
                      </Switch>
                  </AuthProvider>
              </Router>

         
          </div>
      </div>
      
     
   
        
       
    
  )
}

export default App;