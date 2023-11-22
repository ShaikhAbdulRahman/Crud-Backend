const mongoose = require("mongoose");

const emplooyeSchema = new mongoose.Schema({
    empid: { type: String },
    fname: { type: String },
    lname: { type: String },
    email: { type: String },
    mobile: { type: String },
    city: { type: String },
})

const employeModel = mongoose.model("newemp", emplooyeSchema);
module.exports = employeModel