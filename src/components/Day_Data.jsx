import React from 'react'

const Day_Data = ({location, date, min_temp, max_temp, wind_speed, wind_dir, wind_speed_night, wind_dir_night}) => {
    console.log(date)
  return (
    <div>

      <div>
        Location {location}
      </div>
      <div>
      Min Temp {min_temp}
      </div>
      <div>

      Max Temp {max_temp}
      </div>

      <div>
        Wind Speed {wind_speed}
      </div>

      <div>
        Wind Dir {wind_dir}
      </div>

      <div>
        Wind Speed(night) {wind_speed_night}
      </div>

      <div>
        Wind Dir(night) {wind_dir_night}
      </div>

      <div>
        Actions
      </div>
    </div>
    
  )
}

export default Day_Data;