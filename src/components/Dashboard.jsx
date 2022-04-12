import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Form, Modal } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom';
import { db } from "../firebase"


import { collection, onSnapshot, doc, getDocs, limit, addDoc, arrayUnion, updateDoc, arrayRemove, deleteDoc, setDoc, orderBy, query } from 'firebase/firestore';
import Data from './Data';


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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
    // const nameDescending = query(weatherCollectionRef, orderBy("name", "desc"));
    // const q  = query(weatherCollectionRef, orderBy("location", "asc"));
   

    useEffect(() =>{   
        
        // fetch("/data").then(res => {
        //     if(res.ok) {
        //         return res.json()
        //     }
        // }). then(jsonRes => setDays(jsonRes))
    
     onSnapshot(weatherCollectionRef, (snapshot) => {
         setWeatherData(snapshot.docs.map(doc=> ({...doc.data(), id: doc.id}))
         )
        
         
         
            // setWeatherData(snapshot.docs.map(doc => doc.data()))
        })
        setLoading(false)
       
        }, [])

        console.log(weatherData)

      if(loading) return <h1>loading data</h1>

      
      function handleClick(e) {
          e.preventDefault();
          const addDataForm = document.getElementById('location')
          addDoc(weatherCollectionRef, {
              location: newLocation
          }).then(() =>{
            
          })
          
      }
      
        const handleChange = e => {
            
            setNewQuery(e.target.value)
          }

          const filteredLocations = weatherData.filter(weatherData=> weatherData.location.includes(newquery));

          




        async function deleteData(id){
           const docRef = doc(db, "data", "days", "day", id);
           await deleteDoc(docRef)
        }

        async function handleEdit(id){
            
            
            const docRef = doc(db, "data", "days", "day", id);

            
           await updateDoc(docRef, {
               location: newLocation
           })
        }

        async function handleFilter(){

        }
           
        
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
                <th className='name-heading'>Location</th>
                <button>filter</button>
                <th className='height-heading'>Date</th>
                <th className='mass-heading'>Min Temp</th>
                <th className='created-heading'>Max Temp</th>
                <th className='edited-heading'>Wind Speed</th>
                <th className='homeworld-heading'>Wind Dir</th>
                <th className='homeworld-heading'>Wind Speed Night</th>
                <th className='homeworld-heading'>Wind Dir Night</th>
                <th className='homeworld-heading'>Actions</th>
                
                </tr>
            </thead> 
           <tbody>
              
           

{/*            
            {weatherData.station.map(station => {
                
                return(
                    
                    <Data key={station.id}
                    location = {station.location}
                    day = {station.day}
                    
                    />

                    
                )
            })} */}
           {/* {days.map(day =>
            <h1>{day.location}</h1>)} */}


            {filteredLocations.map(weatherData => {
                
                return(
                    <div>
                        <ul>
                            <button onClick={handleShow}>
                                edit
                            </button>
                            <button onClick={() => deleteData(weatherData.id)}>
                                delete
                            </button>
                        <li key={weatherData.id}>
                        {weatherData.location}
                        {weatherData.min_temp}
                        {weatherData.max_temp}
                    </li>
                        </ul>
                        
                        
                    </div>
                )
            })}


</tbody>
       </table>
       </div>

       <div>
           <div>
               <h1>Add New / Edit</h1>
           </div>
           <div>
               <Form id="data-form">
               <Form.Group id="location">
                    <Form.Label>Location</Form.Label>

                    <Form.Control type='text' placeholder='Location' onChange={(event) => {setNewLocation(event.target.value)}}  required />
                </Form.Group>

                
                {/* <Form.Group id="email">
                    <Form.Label>Date</Form.Label>

                    <Form.Control type='date' placeholder='Date'  onChange={(event) => {setNewDate(event.target.value)}} required />
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>Min Temp</Form.Label>

                    <Form.Control type='number' placeholder='Mininum Temperature'  onChange={(event) => {setNewMinTemp(event.target.value)}} required />
                </Form.Group> */}
                {/* <Form.Group id="email">
                    <Form.Label>Max Temp</Form.Label>

                    <Form.Control type='number' placeholder='Maximun Temperature'  onChange={(event) => {setNewMaxTemp(event.target.value)}} required />
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>Wind Speed</Form.Label>

                    <Form.Control type='Number' placeholder='Wind Speed'  onChange={(event) => {setNewWindSpeed(event.target.value)}}  required />
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>Wind Direction</Form.Label>

                    <Form.Control type='text' placeholder='Wind Direction'  onChange={(event) => {setNewWindDir(event.target.value)}}  required />
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>Wind Speed(Night)</Form.Label>

                    <Form.Control type='number' placeholder='Wind Speed(night)'  onChange={(event) => {setNewWindSpeedNight(event.target.value)}}  required />
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>Wind Direction(night)</Form.Label>

                    <Form.Control type='text' placeholder='Wind Direction(night)'  onChange={(event) => {setnewWindDirNight(event.target.value)}} required />
                </Form.Group> */}
               
                <Button onClick={handleClick}>Add Data</Button>
               </Form>
               <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                    <input type="text"
                    
                    placeholder='Location'
                    onChange={(event) => {setNewLocation(event.target.value)}}
                    value={weatherData.location} 
                    />
                    <button onClick={() =>(handleEdit({location: newLocation, id:weatherData.id}))}>Update</button>
            </form>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
              
           </div>
       </div>
    <div className='w-100 text-center mt-2'>
        <Button variant="link" onClick={handleLogout}>Log Out</Button>
    </div>
    </>
  )
}
