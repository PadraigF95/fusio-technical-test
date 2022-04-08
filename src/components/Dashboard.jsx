import React, { useState } from 'react';
import { Card, Button, Alert, Form } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom';

export default function Dashboard() {
    const [error, setError ] = useState('');
    const { currentUser, logout } = useAuth();
    const history = useHistory()


    async function handleLogout(){
        setError('');

        try{
                await logout()
                history.pushState('/login')
        } catch{
            setError('Failed to log out')
        }
    }
  return (
    <>
   <div className='search-container'>
        <h1 className='search-text'>Search For Character</h1>
        <form className='searchbar'>
          <input type="search" placeholder="search..." className="search-input" />
        </form>
      </div>
      <div className='table-container'>
      <table className="table">
            <thead className="thead-dark">
                <tr>
                <th className='name-heading'>Name</th>
                <th className='height-heading'>Height</th>
                <th className='mass-heading'>Mass</th>
                <th className='created-heading'>Created</th>
                <th className='edited-heading'>Edited</th>
                <th className='homeworld-heading'>Homeworld</th>
                <th className='homeworld-heading'>Homeworld</th>
                <th className='homeworld-heading'>Homeworld</th>
                <th className='homeworld-heading'>Homeworld</th>
                
                </tr>
            </thead> 
           <tbody>


<p>Hello World</p>
</tbody>
       </table>
       </div>

       <div>
           <div>
               <h1>Add New / Edit</h1>
           </div>
           <div>
               <Form>
               <Form.Group id="email">
                    <Form.Label>Email</Form.Label>

                    <Form.Control type='email' placeholder='Email Address'  required />
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>

                    <Form.Control type='email' placeholder='Email Address'  required />
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>

                    <Form.Control type='email' placeholder='Email Address'  required />
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>

                    <Form.Control type='email' placeholder='Email Address'  required />
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>

                    <Form.Control type='email' placeholder='Email Address'  required />
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>

                    <Form.Control type='email' placeholder='Email Address'  required />
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>

                    <Form.Control type='email' placeholder='Email Address'  required />
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>

                    <Form.Control type='email' placeholder='Email Address'  required />
                </Form.Group>
               </Form>
           </div>
       </div>
    <div className='w-100 text-center mt-2'>
        <Button variant="link" onClick={handleLogout}>Log Out</Button>
    </div>
    </>
  )
}
