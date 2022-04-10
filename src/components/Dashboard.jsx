import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Form } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom';
import { db } from "../firebase"
import { collection, onSnapshot, doc } from 'firebase/firestore';

export default function Dashboard() {
    const [error, setError ] = useState('');
    const { currentUser, logout } = useAuth();
    const history = useHistory()
    const [weatherData, setWeatherData] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => 
     onSnapshot(doc(db, "weather-data", "forecast"), (doc) => {
         setWeatherData(doc.data())
         console.log("current data", doc.data())
            // setWeatherData(snapshot.docs.map(doc => doc.data()))
        })
        
    , [])
        // console.log(weatherData.station.map())
   
    
    
    // for (const [key, value] of Object.entries(databaseData)) {
    //     console.log(`${key}: ${value}`)
    // }
     
        // const dublinData = weatherData[0].station[0].day;

        const handleChange = e => {
            setSearch(e.target.value)
          }
           
    
        // const filteredLocations = databaseData.filter(data =>
        //     data.location.toLowerCase().includes(search.toLowerCase()))



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
          <input type="search" placeholder="search..." onChange={handleChange} className="search-input" />
          
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
           {console.log(weatherData.station.map(({location}) => {
               return(
                  
                   {location}
                   
               )
           }))}


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
