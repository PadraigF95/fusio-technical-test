import React from 'react'
import Day_Data from './Day_Data'

const Data = ({ location, id, day}) => {
    
  return (
    <>
    
    {day.map(day=> {
        return(
            <Day_Data location ={location}
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