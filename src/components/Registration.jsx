import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

const Registration = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confpasswordRef = useRef();
    const eircodeRef = useRef();
    const photoRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('')
    const[loading, setLoading] = useState(false)
    const history = useHistory();

   async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== confpasswordRef.current.value){
        
        return setError('Passwords do not match')
    }

    if(passwordRef.current.value <= 8){
        return setError('Password is not 8 characters')
    }

    try {
        setError('')
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value)
        history.push('/')
        db.collection("users").add({email: 'test567@test.com', password: 'password', eircode: 'Y34 FR82'})
    }catch {
            setError('Failed to create an account')
    }
    setLoading(false)
   }

  return (
    <>
    <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Sign Up</h2>
            
            {error && <Alert variant='danger'>{error}</Alert> }
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>

                    <Form.Control type='email' placeholder='Email Address' ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>

                    <Form.Control type='password' placeholder='Password' ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="confirm-password">
                    <Form.Label>Confirm Password</Form.Label>

                    <Form.Control type='password' placeholder='Confirm Password' ref={confpasswordRef} required />
                </Form.Group>
                <Form.Group id="eircode">
                    <Form.Label>Eircode</Form.Label>

                    <Form.Control type='text' placeholder='Eircode' ref={eircodeRef} required />
                    
                </Form.Group>
                {/* <Form.Group id="photo">
                    <Form.Label>Photo</Form.Label>

                    <Form.Control type='file' ref={photoRef} required />
                </Form.Group> */}
                
                <Button disabled={loading} className='w-100 mt-4' type="submit">Sign Up</Button>
            </Form>
            
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
        Already have an account? <Link to="/login">Log in</Link>
    </div>
    </>
  )
}

export default Registration