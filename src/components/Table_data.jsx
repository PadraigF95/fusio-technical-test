import React, { useState } from 'react'
import { db } from "../firebase"

import { Card, Button, Alert, Form, Modal } from 'react-bootstrap';

import { collection, onSnapshot, doc, getDocs, limit, addDoc, arrayUnion, updateDoc, arrayRemove, deleteDoc, setDoc, orderBy, query } from 'firebase/firestore';
const Table_data = ({location, min_temp, max_temp, id, date, wind_speed, wind_dir, wind_speed_night, wind_dir_night}) => {
    const [show, setShow] = useState(false);
    const [newLocation, setNewLocation] = useState(location)
    const [newDate, setNewDate] = useState(date)
    const [newMinTemp, setNewMinTemp] = useState(min_temp)
    const [newMaxTemp, setNewMaxTemp] = useState(max_temp)
    const [newWindSpeed, setNewWindSpeed] = useState(wind_speed);
    const [newWindDir, setNewWindDir] = useState(wind_dir);
    const [newWindSpeedNight, setNewWindSpeedNight] = useState(wind_speed_night);
    const [newWindDirNight, setnewWindDirNight] = useState(wind_dir_night);
   
    
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  console.log([ location ])



 

    async function deleteData(id){
        const docRef = doc(db, "data", "days", "day", id);
        await deleteDoc(docRef)
     }

     async function handleEdit(id ){
            
            
        const docRef = doc(db, "data", "days", "day", id);

        
       await setDoc(docRef, {
           location: newLocation,
           date: new Date(newDate),
           min_temp: parseInt(newMinTemp),
           max_temp: parseInt(newMaxTemp),
           wind_speed: parseInt(newWindSpeed),
           wind_dir: newWindDir,
           wind_speed_night: parseInt(newWindSpeedNight),
           wind_dir_night: newWindDirNight,
           
       })
    }
  return (
    <>
     
    <tr>

       
        <td>{location}</td>
        <td></td>
        <td>{min_temp}</td>
        <td>{max_temp}</td>
        <td>{wind_speed}</td>
        <td>{wind_dir}</td>
        <td>{wind_speed_night}</td>
        <td>{wind_dir_night}</td>
        <div>
        <button onClick={() => deleteData(id)}>Delete</button>
        <button onClick={handleShow}>Edit</button>
        </div>
       
    </tr>

    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                    <input type="text"
                    defaultValue={location}
                    placeholder='Location'
                    onChange={(event) => {setNewLocation(event.target.value)}}
                    />
                    <input type="date"
                    defaultValue={date}
                    placeholder='Date'
                    onChange={(event) => {setNewDate(event.target.value)}}
                    />
                    <input type="number"
                    defaultValue={min_temp}
                    placeholder='Min Temp'
                    onChange={(event) => {setNewMinTemp(event.target.value)}}
                    />
                    <input type="number"
                    defaultValue={max_temp}
                    placeholder='Max Temp'
                    onChange={(event) => {setNewMaxTemp(event.target.value)}}
                    />
                    <input type="number"
                    defaultValue={wind_speed}
                    placeholder='Wind Speed'
                    onChange={(event) => {setNewWindSpeed(event.target.value)}}
                    />
                    <input type="text"
                    defaultValue={wind_dir}
                    placeholder='Wind Dir'
                    onChange={(event) => {setNewWindDir(event.target.value)}}
                    />
                    <input type="number"
                    defaultValue={wind_speed_night}
                    placeholder='Wind Speed Night'
                    onChange={(event) => {setNewWindSpeedNight(event.target.value)}}
                    />
                    <input type="text"
                    defaultValue={wind_dir_night}
                    placeholder='Wind Direction Night'
                    onChange={(event) => {setnewWindDirNight(event.target.value)}}
                    />
                    
            </form>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={() => handleEdit(id  )}>Update</Button>
          
        </Modal.Footer>
      </Modal>

      
    </>
  )
}

export default Table_data