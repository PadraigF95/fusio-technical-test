import React from 'react'
import { Container } from 'react-bootstrap';
import Login from './components/Login';
import Dashboard from './components/Dashboard'
import Registration from './components/Registration';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';


const App = () => {
  return (
      <div className='app__container'
      >
  
      
          <div className='app__routes'>
              <Router>
                  <AuthProvider>
                      <Switch>
                          
                            <PrivateRoute exact path="/" component={Dashboard} />
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