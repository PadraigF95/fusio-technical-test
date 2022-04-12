const mongoose = require("mongoose");

const stationSchema = {
    location:String,
    day:[{
        date:String,
        min_temp:Number,
        max_temp:Number,
        wind_speed:Number,
        wind_dir:String,
        wind_speed_night:Number,
        wind_dir_night:String
    }]
}

const Day = mongoose.model("Day", stationSchema);

module.exports = Day;