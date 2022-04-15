import React, { useState } from 'react'
import { db } from "../firebase"

import { Button, Modal } from 'react-bootstrap';
import '../index.css'

import { doc,  deleteDoc, setDoc } from 'firebase/firestore';
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
  
  



  let formatDates = new Date(date.seconds * 1000)

  let normalDate = new Date(formatDates).toLocaleString('en-GB', {timezone: 'UTC'})

  
  
  

  

  
 

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
     
    <tr className='data-values'>

       
        <td className='data-location'>{location}</td>
        <td className='data-date'>{normalDate.substring(0,10)}</td>
        <td className='data-min_temp'>{min_temp}</td>
        <td className='data-max_temp'>{max_temp}</td>
        <td className='data-wind_speed'>{wind_speed}</td>
        <td className='data-wind_dir'>{wind_dir}</td>
        <td className='data-wind_speed_night'>{wind_speed_night}</td>
        <td className='data-wind_dir_night'>{wind_dir_night}</td>
        <td className='data-action'>
        <p className='data-edit' onClick={handleShow}>Edit</p>
        <p>|</p>
        <p className='data-delete' onClick={() => deleteData(id)}>Delete</p>
        
        </td>
        
        
       
    </tr>

    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className='form-grid'>
                    <input type="text"
                    defaultValue={location}
                    placeholder='Location'
                    onChange={(event) => {setNewLocation(event.target.value)}}
                    />
                    <input type="date"
                    defaultValue={normalDate}
                    placeholder='Date'
                    className='mt-2'
                    onChange={(event) => {setNewDate(event.target.value)}}
                    />
                    <input type="number"
                    defaultValue={min_temp}
                    placeholder='Min Temp'
                    className='mt-2'
                    onChange={(event) => {setNewMinTemp(event.target.value)}}
                    />
                    <input type="number"
                    defaultValue={max_temp}
                    placeholder='Max Temp'
                    className='mt-2'
                    onChange={(event) => {setNewMaxTemp(event.target.value)}}
                    />
                    <input type="number"
                    defaultValue={wind_speed}
                    placeholder='Wind Speed'
                    className='mt-2'
                    onChange={(event) => {setNewWindSpeed(event.target.value)}}
                    />
                    <input type="text"
                    defaultValue={wind_dir}
                    placeholder='Wind Dir'
                    className='mt-2'
                    onChange={(event) => {setNewWindDir(event.target.value)}}
                    />
                    <input type="number"
                    defaultValue={wind_speed_night}
                    placeholder='Wind Speed Night'
                    className='mt-2'
                    onChange={(event) => {setNewWindSpeedNight(event.target.value)}}
                    />
                    <input type="text"
                    defaultValue={wind_dir_night}
                    placeholder='Wind Direction Night'
                    className='mt-2'
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