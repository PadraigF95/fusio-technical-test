const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")

app.use(cors());
app.use(express.json())

//connect to mongoose
mongoose.connect("mongodb+srv://Padraig:wqh2F5P73UCiGAzf@cluster0.2br1w.mongodb.net/Sample.Data?retryWrites=true&w=majority");
//require router
app.use("/", require("../routes/dayRoute"))

app.listen(3001, function() {
    console.log("express server is running on port 3001")
})