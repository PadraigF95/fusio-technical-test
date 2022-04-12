const express = require("express")
const router = express.Router();
const Day = require("../models/dayModel")

router.route("/create").post((req, res) => {
    const location = req.body.location;
    const date = req.body.date;
    const min_temp = req.body.min_temp
    const newStation = new Day({
        location
       
    })

    newStation.save();
})
router.route("/data").get((req, res) => {
    Day.find()
    .then(foundDay => res.json(foundDay))
})

module.exports = router