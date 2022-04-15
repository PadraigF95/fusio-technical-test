import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Form, Modal, Row,Col } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'

import { useHistory } from 'react-router-dom';
import { db } from "../firebase"
import { AiOutlineSearch } from 'react-icons/ai'
import { TiArrowSortedDown,TiArrowSortedUp } from 'react-icons/ti'

import { collection, onSnapshot, doc, getDocs, limit, addDoc, arrayUnion, updateDoc, arrayRemove, deleteDoc, setDoc, orderBy, query } from 'firebase/firestore';

import Table_data from './Table_data';
import Navbar from './Navbar';


export default function Dashboard() {
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

      const sortingDSC = (col) => {
          if (order === "ASC") {
              const sorted = [...weatherData].sort((a, b) =>
              a[col] > b[col] ? 1 : -1)
              setWeatherData(sorted);
              setOrder("DSC")
          } 
            
      }

      const sortingASC = (col) => {
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
          console.log(newDate)
      }
      
        const handleChange = e => {
            
            setNewQuery(e.target.value)
          }

          const filteredLocations = weatherData.filter(weatherData=> weatherData.location.includes(newquery));

           
        if(weatherData === undefined){
            return <h1>Loading</h1>
        }
    


   
  return (
    <>
    <Navbar />
   <div className='search-container'>
        
        <form className='searchbar'>
        <AiOutlineSearch className='search-icon'/>
          <input 
          
          type="search" 
          
          placeholder="search by county" 
          onChange={handleChange}
           className="search-input" 
           />
           
          
        </form>
      </div>
      <div className='table-container'>
      <table className="table">
            <thead className="thead-dark">
                <tr>
                <th className='name-heading'>Location
                <TiArrowSortedUp className="sort_icon_asc" onClick={() =>sortingASC('location')} />
                <TiArrowSortedDown className='sort_icon_dsc' onClick={() =>sortingDSC('location')} />
                </th>
                
                <th className='height-heading'>Date
                <TiArrowSortedUp className="sort_icon_asc" onClick={() => sortingASC('date')} />
                <TiArrowSortedDown className='sort_icon_dsc' onClick={() => sortingDSC('date')}/>
                </th>
                <th className='mass-heading'>Min Temp
                <TiArrowSortedUp className="sort_icon_asc" onClick={() => sortingASC('min_temp')}/>
                <TiArrowSortedDown className='sort_icon_dsc' onClick={() => sortingDSC('min_temp')} />
                </th>
                <th className='created-heading'>Max Temp
                <TiArrowSortedUp className="sort_icon_asc" onClick={() => sortingASC('max_temp')}/>
                <TiArrowSortedDown className='sort_icon_dsc' onClick={() => sortingDSC('max_temp')}/>
                </th>
                <th className='edited-heading'>Wind Speed
                <TiArrowSortedUp className="sort_icon_asc" onClick={() => sortingASC('wind_speed')}/>
                <TiArrowSortedDown className='sort_icon_dsc' onClick={() => sortingDSC('wind_speed')} />
                </th>
                <th className='homeworld-heading'>Wind Dir
                <TiArrowSortedUp className="sort_icon_asc" onClick={() => sortingASC('wind_dir')}/>
                <TiArrowSortedDown className='sort_icon_dsc' onClick={() => sortingDSC('wind_dir')}/>
                </th>
                <th className='homeworld-heading'>Wind Speed Night
                <TiArrowSortedUp className="sort_icon_asc" onClick={() => sortingASC('wind_speed_night')}/>
                <TiArrowSortedDown className='sort_icon_dsc' onClick={() => sortingDSC('wind_speed_night')}/>
                </th>
                <th className='homeworld-heading'>Wind Dir Night
                <TiArrowSortedUp className="sort_icon_asc" onClick={() => sortingASC('wind_dir_night')}/>
                <TiArrowSortedDown className='sort_icon_dsc' onClick={() => sortingDSC('wind_dir_night')}/>
                </th>
                {currentUser && (

                <th className='homeworld-heading'>Actions</th>
                )}
                
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
{currentUser && (


       <div className='add-data-from'>
           <div className='add-data-form-heading'>
               <h1 className='add-data-form-title'>Add New</h1>
           </div>
           <div className='add-form'>
               <Form id="data-form">
               <Form.Group id="location" as={Row}>
                    <Form.Label column sm="2">Location</Form.Label>
                    <Col sm="10">
                    {/* <Form.Control type='text' placeholder='Location' onChange={(event) => {setNewLocation(event.target.value)}}  required /> */}
                    <Form.Select placeholder=""  onClick={(event) => {setNewLocation(event.target.value)}} required>
                        <option></option>
                        <option value="Dublin">Dublin</option>
                        <option value="Wexford">Wexford</option>
                        <option value ="Cork">Cork</option>
                        <option value="Kerry">Kerry</option>
                        <option value="Galway">Galway</option>
                        <option value="Donegal">Donegal</option>
                        <option value="Offaly">Offaly</option>
                        <option value="Mayo">Mayo</option>
                        <option value="Belfast">Belfast</option>
                       
                    </Form.Select>
                    </Col>
                    
                </Form.Group>

                
                <Form.Group id="date" as={Row} className="mt-4">
                    <Form.Label column sm="2">Date</Form.Label>
                    <Col sm="10">
                    <Form.Control type='date' placeholder='Date'  onChange={(event) => {setNewDate(event.target.value)}} required />
                    </Col>
                    
                </Form.Group>

                <Form.Group id="min_temp" as={Row} className="mt-4">
                    <Form.Label column sm="2">Min Temp</Form.Label>
                    <Col sm="10">
                    <Form.Control type='number' placeholder='Number'  onChange={(event) => {setNewMinTemp(event.target.value)}} required />
                    </Col>
                </Form.Group>

                <Form.Group id="max_temp" as={Row} className="mt-4">
                    <Form.Label column sm="2">Max Temp</Form.Label>
                    <Col sm="10">
                    <Form.Control type='number' placeholder='Number'  onChange={(event) => {setNewMaxTemp(event.target.value)}} required />
                    </Col>
                </Form.Group>

                <Form.Group id="wind_speed" as={Row} className="mt-4">
                    <Form.Label column sm="2">Wind Speed</Form.Label>
                    <Col sm="10">
                    <Form.Control type='number' placeholder='Number'  onChange={(event) => {setNewWindSpeed(event.target.value)}}  required />
                    </Col>

                </Form.Group>

                <Form.Group id="wind_direction" as={Row} className="mt-4">
                    <Form.Label column sm="2">Wind Direction</Form.Label>
                    <Col sm="10">
                    <Form.Control type='text' placeholder='Cardinal Direction'  onChange={(event) => {setNewWindDir(event.target.value)}}  required />
                    </Col>
                </Form.Group>

                <Form.Group id="wind_speed_night" as={Row} className="mt-4">
                    <Form.Label column sm="2">Wind Speed(Night)</Form.Label>
                        <Col sm="10">
                        <Form.Control type='number' placeholder='Number'  onChange={(event) => {setNewWindSpeedNight(event.target.value)}}  required />
                        </Col>
                </Form.Group>
                <Form.Group id="wind_dir_night" as={Row} className="mt-4">
                    <Form.Label column sm="2">Wind Direction(Night)</Form.Label>
                    <Col sm="10">
                        <Form.Control type='text' placeholder='Cardinal Direction'  onChange={(event) => {setnewWindDirNight(event.target.value)}} required />
                    </Col>
               <div  className="add-data-button">

               <Button onClick={handleClick}>Add Data</Button>
               </div>
                </Form.Group>
               
                
               </Form>
              
              
           </div>
           
       </div>
    )}
    </>
  )
}
