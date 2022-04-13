import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Form, Modal } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom';
import { db } from "../firebase"


import { collection, onSnapshot, doc, getDocs, limit, addDoc, arrayUnion, updateDoc, arrayRemove, deleteDoc, setDoc, orderBy, query } from 'firebase/firestore';

import Table_data from './Table_data';


export default function Dashboard() {
    const [error, setError ] = useState('');
    const { currentUser, logout } = useAuth();
    const history = useHistory()
    const [weatherData, setWeatherData] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true)
    const [newLocation, setNewLocation] = useState("")
    const [newDate, setNewDate] = useState(0)
    const [newMinTemp, setNewMinTemp] = useState(0)
    const [newMaxTemp, setNewMaxTemp] = useState(0)
    const [newWindSpeed, setNewWindSpeed] = useState(0);
    const [newWindDir, setNewWindDir] = useState("");
    const [newWindSpeedNight, setNewWindSpeedNight] = useState(0);
    const [newWindDirNight, setnewWindDirNight] = useState("");
    const weatherCollectionRef = collection(db, "data", "days", "day")
    const [newquery, setNewQuery] = useState("");
    const [show, setShow] = useState(false);
    const [order, setOrder] = useState("ASC")

    
    

    useEffect(() =>{   
    
     onSnapshot(weatherCollectionRef, (snapshot) => {
         setWeatherData(snapshot.docs.map(doc=> ({...doc.data(), id: doc.id}))
         )
        
         
         
            // setWeatherData(snapshot.docs.map(doc => doc.data()))
        })
        setLoading(false)
       
        }, [])

        

      if(loading) return <h1>loading data</h1>

      const sorting = (col) => {
          if (order === "ASC") {
              const sorted = [...weatherData].sort((a, b) =>
              a[col] > b[col] ? 1 : -1)
              setWeatherData(sorted);
              setOrder("DSC")
          } 
          if (order === "DSC") {
              const sorted = [...weatherData].sort((a, b) =>
              a[col] < b[col] ? 1 : -1);
              setWeatherData(sorted);
              setOrder("ASC")
          }
      }

      
      function handleClick(e) {
          e.preventDefault();
          
          addDoc(weatherCollectionRef, {
              location: newLocation,
              date: new Date(newDate),
              min_temp: parseInt(newMinTemp),
              max_temp: parseInt(newMaxTemp),
              wind_speed: parseInt(newWindSpeed),
              wind_dir: newWindDir,
              wind_speed_night: parseInt(newWindSpeedNight),
              wind_dir_night: newWindDirNight
          }).then(() =>{
            document.getElementById('data-form').reset()
          })
          
      }
      
        const handleChange = e => {
            
            setNewQuery(e.target.value)
          }

          const filteredLocations = weatherData.filter(weatherData=> weatherData.location.includes(newquery));

           
        if(weatherData === undefined){
            return <h1>Loading</h1>
        }
    


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
          <input type="search" placeholder="search by county" onChange={handleChange} className="search-input" />
          
        </form>
      </div>
      <div className='table-container'>
      <table className="table">
            <thead className="thead-dark">
                <tr>
                <th className='name-heading' onClick={() => sorting("location")}>Location</th>
                
                <th className='height-heading' onClick={() => sorting("date")}>Date</th>
                <th className='mass-heading' onClick={() => sorting("min_temp")}>Min Temp</th>
                <th className='created-heading' onClick={() => sorting("max_temp")}>Max Temp</th>
                <th className='edited-heading'onClick={() => sorting("wind_speed")}>Wind Speed</th>
                <th className='homeworld-heading' onClick={() => sorting("wind_dir")}>Wind Dir</th>
                <th className='homeworld-heading' onClick={() => sorting("wind_speed_night")}>Wind Speed Night</th>
                <th className='homeworld-heading' onClick={() => sorting("wind_dir_night")}>Wind Dir Night</th>
                <th className='homeworld-heading'>Actions</th>
                
                </tr>
            </thead> 
           <tbody>
              
           



            {filteredLocations.map(weatherData => {
                
                
                return(
                    <Table_data key={weatherData.id}
                        id ={weatherData.id}
                        date= {weatherData.date}
                        location = {weatherData.location}
                        min_temp = {weatherData.min_temp}
                        max_temp = {weatherData.max_temp}
                        wind_speed= {weatherData.wind_speed}
                        wind_dir = {weatherData.wind_dir}
                        wind_speed_night = {weatherData.wind_speed_night}
                        wind_dir_night = {weatherData.wind_dir_night}
                    />
                )
            })}


</tbody>
       </table>
       </div>

       <div>
           <div>
               <h1>Add New</h1>
           </div>
           <div className='add-form'>
               <Form id="data-form">
               <Form.Group id="location">
                    <Form.Label>Location</Form.Label>

                    <Form.Control type='text' placeholder='Location' onChange={(event) => {setNewLocation(event.target.value)}}  required />
                </Form.Group>

                
                <Form.Group id="date">
                    <Form.Label>Date</Form.Label>

                    <Form.Control type='date' placeholder='Date'  onChange={(event) => {setNewDate(event.target.value)}} required />
                </Form.Group>
                <Form.Group id="min_temp">
                    <Form.Label>Min Temp</Form.Label>

                    <Form.Control type='number' placeholder='Mininum Temperature'  onChange={(event) => {setNewMinTemp(event.target.value)}} required />
                </Form.Group>
                <Form.Group id="max_temp">
                    <Form.Label>Max Temp</Form.Label>

                    <Form.Control type='number' placeholder='Maximun Temperature'  onChange={(event) => {setNewMaxTemp(event.target.value)}} required />
                </Form.Group>
                <Form.Group id="wind_speed">
                    <Form.Label>Wind Speed</Form.Label>

                    <Form.Control type='number' placeholder='Wind Speed'  onChange={(event) => {setNewWindSpeed(event.target.value)}}  required />
                </Form.Group>
                <Form.Group id="wind_direction">
                    <Form.Label>Wind Direction</Form.Label>

                    <Form.Control type='text' placeholder='Wind Direction'  onChange={(event) => {setNewWindDir(event.target.value)}}  required />
                </Form.Group>
                <Form.Group id="wind_speed_night">
                    <Form.Label>Wind Speed(Night)</Form.Label>

                    <Form.Control type='number' placeholder='Wind Speed(night)'  onChange={(event) => {setNewWindSpeedNight(event.target.value)}}  required />
                </Form.Group>
                <Form.Group id="wind_dir_night">
                    <Form.Label>Wind Direction(night)</Form.Label>

                    <Form.Control type='text' placeholder='Wind Direction(night)'  onChange={(event) => {setnewWindDirNight(event.target.value)}} required />
                </Form.Group>
               
                <Button onClick={handleClick}>Add Data</Button>
               </Form>
               
              
              
           </div>
       </div>
    <div className='w-100 text-center mt-2'>
        <Button variant="link" onClick={handleLogout}>Log Out</Button>
    </div>
    </>
  )
}
