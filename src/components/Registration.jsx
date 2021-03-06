import { addDoc,  collection } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { Form, Button, Card, Alert, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth, } from '../contexts/AuthContext';
import { db,  storage } from '../firebase';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Navbar from './Navbar';


const Registration = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confpasswordRef = useRef('');
    const eircodeRef = useRef(0);
    const photoRef = useRef();
    const { signup} = useAuth();
    const [error, setError] = useState('')
    const[loading, setLoading] = useState(false)
    const history = useHistory();
    const [file, setFile] = useState("");
    const [data, setData] = useState({});
    const passwordRegex = new RegExp(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/)
    const eircodeRegex = new RegExp(/([AC-FHKNPRTV-Y]\d{2}|D6W)[0-9AC-FHKNPRTV-Y]{4}/)
    

  

    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name
            const storageRef = ref(storage, file.name)
            const uploadTask = uploadBytesResumable(storageRef, file);


            uploadTask.on(
                "state_changed",
                (snapshot) => {

                    const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is" + progress + "% done");
                    switch(snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                       setData((prev)=>({...prev, img:downloadURL}))
                    });
                }
            );
        };
        file && uploadFile();
    }, [file])

    
   async function handleSubmit(e) {
        e.preventDefault()
    
        
        if(passwordRef.current.value !== confpasswordRef.current.value){
        
        return setError('Passwords do not match')
    }

    if(passwordRegex.test(passwordRef.current.value)){
       
    }
        else{
            return setError('Password needs one capital, one number & one special character')
        }
    if(eircodeRegex.test(eircodeRef.current.value)) {
        
    }
    else{
        return setError('Please Enter a valid Eircode')
    }
    

    // if(passwordRef.current.value === !'^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$') {
    //     return setError('Password needs to have One capital, One number and One special Character')
    // }

    // if(eircodeRef.current.value === !'([AC-FHKNPRTV-Y]\d{2}|D6W)[0-9AC-FHKNPRTV-Y]{4}') {
    //     return setError('Please Enter a valid Eircode No Spaces, example Y34FR82')
    // }

   
   


    try {
        setError('')
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value, eircodeRef.current.value)
        history.push('/')
    }catch {
            setError('Failed to create an account')
    }
    setLoading(false)
   }

   const saveChange = async()=>{
    await addDoc(collection(db, "users"), {
        email: emailRef.current.value,
        eircode: eircodeRef.current.value
    }, {merge: true})
}

  return (
      
    <>
    <Navbar />
    <div className='app__registration-form'>

    <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Sign Up</h2>
            
            {error && <Alert variant='danger'>{error}</Alert> }
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email" as={Row} className="mt-4">
                    <Form.Label column sm='2'>Email</Form.Label>

                    <Col sm="10">
                    <Form.Control type='email' placeholder='Email Address' ref={emailRef} required="Please enter an email" />
                    </Col>

                </Form.Group>
                <Form.Group id="password" as={Row} className="mt-4">
                    <Form.Label column sm='2'>Password</Form.Label>

                    <Col sm="10">
                    <Form.Control type='password' placeholder='Password- One Capital,One Number & One Special' ref={passwordRef}  required = "Enter a Password with one capital, one number and one special character" />
                    </Col>

                </Form.Group>

                <Form.Group id="confirm-password" as={Row} className="mt-4">
                    <Form.Label column sm='2'>Confirm Password</Form.Label>
                    <Col sm='10'>
                    <Form.Control type='password' placeholder='Confirm Password' ref={confpasswordRef}  required = 'Make sure the passwords match' />
                    </Col>
                </Form.Group>

                <Form.Group id="eircode" as={Row} className="mt-4">
                    <Form.Label column sm = "2">Eircode</Form.Label>
                    <Col sm="10">
                    <Form.Control type='text' placeholder='Eircode' ref={eircodeRef}  required="enter valid Eircode" />
                    </Col>
                    
                </Form.Group>
                <Form.Group id="photo" as={Row} className="mt-4">
                    <Form.Label column = "2">Photo</Form.Label>
                    <Col sm="10">
                    <Form.Control type='file' ref={photoRef} onChange={(e) => setFile(e.target.files[0])} required='Select a profile picture' />
                    </Col>
                    <div className='image-container'>
                    <img src={ file
                    ? URL.createObjectURL(file):
                    "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" } alt="profile"/>
                    </div>
                   
                </Form.Group>
                
            <div className='register-button'>
                <Button disabled={loading}  type="submit" onClick={saveChange}>Sign Up</Button>

            </div>
            </Form>
            
        </Card.Body>
    </Card>
    </div>
 
    </>
  )
}

export default Registration