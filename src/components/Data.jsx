import React, { useState } from 'react'
import Day_Data from './Day_Data'
import { Card, Button, Alert, Form } from 'react-bootstrap';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';


const Data = ({ location, id, day}) => {

  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    
    setSearch(e.target.value)
    console.log('search',search)
  }
 const handleDelete = (day) => {
    deleteDoc(doc(db, 'test-data', 'forecast'))
  }
  

   
  return (
    <>
   
    {day.map(day=> {
        return(
            <Day_Data key={day.day_num}
            handleDelete ={handleDelete}
            location ={location}
            date = {day.date}
            min_temp ={day.min_temp}
            max_temp = {day.max_temp}
            wind_speed = {day.wind_speed}
            wind_dir = {day.wind_dir}
            wind_speed_night = {day.wind_speed_night}
            wind_dir_night = {day.wind_dir_night}
           />
            )
        })} 

        
    </>
  )
}

export default Data