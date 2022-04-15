import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('')
    const[loading, setLoading] = useState(false)
    const history = useHistory()

   async function handleSubmit(e) {
        e.preventDefault()

    

    

    try {
        setError('')
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        history.push('/')
    }catch {
            setError('Failed to sign in')
    }
    setLoading(false)
   }

  return (
    <>
    <Navbar />
    <div className='app__login-form'>

    <Card>
        <Card.Body className='app__card-body'>
            <h2 className='text-center mb-4'>Login</h2>
            
            {error && <Alert variant='danger'>{error}</Alert> }
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Group id="email" as={Row} className="mt-4">
                    <Form.Label column sm="2">Email</Form.Label>
                    <Col sm="10">
                    <Form.Control type='email' placeholder='Email Address' ref={emailRef} required />
                    </Col>
                </Form.Group>

                <Form.Group id="password" as={Row} className="mt-4">
                    <Form.Label column sm='2'>Password</Form.Label>
                    <Col sm='10'>
                    <Form.Control type='password' placeholder='Password' ref={passwordRef} required />
                    </Col>
                </Form.Group>
             
                
            <div  className='login-button'>

            <Button disabled={loading} type="submit">Login</Button>
            </div>
            </Form>
        </Card.Body>
    </Card>
    
    </div>
    </>
  )
}

export default Login