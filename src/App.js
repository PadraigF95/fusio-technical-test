import React from 'react'
import { Container } from 'react-bootstrap';
import Login from './components/Login';
import Dashboard from './components/Dashboard'
import Registration from './components/Registration';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
      
             <Container className='d-flex align-items-center justify-content-center'
      style={{ minHeight: "100vh"}}
      >
          <div className='w-100'>
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
      </Container>
      
     
   
        
       
    
  )
}

export default App;