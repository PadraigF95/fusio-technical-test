import React from 'react'
import { Card, Button, Alert, Form } from 'react-bootstrap';

const Day_Data = ({location, date, min_temp, max_temp, wind_speed, wind_dir, wind_speed_night, wind_dir_night, handleDelete}) => {
    
  return (
    <>
    <tr>
      <td className='app__day-data_location'>
         {location}
      </td>
      <td>
     {Object.keys(date)}
      </td>
      <td className='app__day-data_min_temp'>
       {min_temp}
      </td>
      <td>
        <button>Edit</button>
        <button>Delete</button>
      </td>
      {/* <td className='app__day-data_max_temp'>

       {max_temp}
      </td>

      <td className='app__day-data_wind_speed'>
        {wind_speed}
      </td>

      <td className='app__day-data_wind_dir'>
         {wind_dir}
      </td>

      <td className='app__day-data_wind_speed_night'>
         {wind_speed_night}
      </td>

      <td className='app__day-data_wind_dir_night'>
         {wind_dir_night}
      </td>

      <td className='app__day-data_actions'>
       
      </td> */}
      </tr>
      
    </>
    
  )
}

export default Day_Data;