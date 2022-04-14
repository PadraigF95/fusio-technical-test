import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Col, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

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
    <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Login</h2>
            
            {error && <Alert variant='danger'>{error}</Alert> }
            <Form onSubmit={handleSubmit}>
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
             
                <Button disabled={loading} className='w-100 mt-4' type="submit">Login</Button>
            </Form>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
        Need an account? <Link to ="/registration">Sign Up</Link>
    </div>
    </>
  )
}

export default Login