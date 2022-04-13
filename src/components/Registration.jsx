import { addDoc, setDoc, collection } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth, currentUser } from '../contexts/AuthContext';
import { db, auth, storage } from '../firebase';
import { doc } from "firebase/firestore"; 
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


const Registration = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confpasswordRef = useRef('');
    const eircodeRef = useRef(0);
    const photoRef = useRef();
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState('')
    const[loading, setLoading] = useState(false)
    const history = useHistory();
    const [file, setFile] = useState("");
    const [data, setData] = useState({});
    
    const strongRegex = new RegExp("^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$");
    const eircodeRegex = new RegExp('')

    // async function fetchUsers() {
    //     db.collection("users").add({email: emailRef.current.value, password: passwordRef.current.value, eircode: eircodeRef.current.value})
    // }

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

    // if(passwordRef.current.value !== strongRegex){
    //     return setError('Password needs to be 8 characters with one capital letter, one number and one special character ')
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
        password: passwordRef.current.value,
        eircode: eircodeRef.current.value
    }, {merge: true})
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

                    <Form.Control type='text' placeholder='Password' ref={passwordRef} pattern='^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$' required />
                </Form.Group>
                <Form.Group id="confirm-password">
                    <Form.Label>Confirm Password</Form.Label>

                    <Form.Control type='password' placeholder='Confirm Password' ref={confpasswordRef} pattern='^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$' required />
                </Form.Group>
                <Form.Group id="eircode">
                    <Form.Label>Eircode</Form.Label>

                    <Form.Control type='text' placeholder='Eircode' ref={eircodeRef} pattern='([AC-FHKNPRTV-Y]\d{2}|D6W)[0-9AC-FHKNPRTV-Y]{4}' required />
                    
                </Form.Group>
                <Form.Group id="photo">
                    <Form.Label>Photo</Form.Label>

                    <Form.Control type='file' ref={photoRef} onChange={(e) => setFile(e.target.files[0])} required />
                    <div className='image-container'>
                    <img src={ file
                    ? URL.createObjectURL(file):
                    "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" } alt="profile Image"/>
                    </div>
                   
                </Form.Group>
                
                <Button disabled={loading} className='w-100 mt-4' type="submit" onClick={saveChange}>Sign Up</Button>
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