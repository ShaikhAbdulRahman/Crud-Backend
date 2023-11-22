const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const employeModel = require("./Model/employeModel");
const bodyParser = require("body-parser");
const app = express();
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
const port = 8888;

mongoose.connect("mongodb://127.0.0.1:27017/TASKS").then(() => {
    console.log("DB is connected successfully!!");
});

app.get("/", async (req, res) => {
    res.send("Api is Connected")
})
app.get("/emp", async (req, res) => {
    const result = await employeModel.find({});
    res.send(result)
})
app.post("/addemp", async (req, res) => {
    try {
        const payload = req.body;
        const newEmp = new employeModel(payload);
        await newEmp.save();
        res.send("Emplooye is Added")
    } catch (error) {
        console.log(error);
    }
});

app.delete("/delemp/:id", async (req, res) => {
    try {
        const employeeId = req.params.id;
        const result = await employeModel.findByIdAndDelete(employeeId);

        if (!result) {
            return res.status(404).send("Employe not found")
        }
        res.send("Emplooye deleted Sucessfully")
    } catch (error) {
        console.log(error);
    }
})

app.put("/updateemp/:id", async (req, res) => {
    try {
        const employeId = req.params.id;
        const updataData = req.body;
        const result = await employeModel.findByIdAndUpdate(
            employeId,
            updataData,
            { new: true }
        );
        if (!result) {
            return res.status(404).send("Emplooye Not Found")
        };
        res.send("Emplooye Updated!!!")
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error")
    }
})

// app.put("/updateemp/:id", async (req, res) => {
//     console.log("check body",req.body);
//     console.log("check id",req.params.id);
//     try {
//       const employeeId = req.params.id;
//       const updatedData = req.body;
//       const result = await emplooyeModel.findByIdAndUpdate(
//         employeeId,
//         updatedData,
//         { new: true }
//       );
  
//       if (!result) {
//         return res.status(404).send("Employee not found");
//       }
  
//       res.send("Employee updated successfully");
//     } catch (error) {
//       console.error("Error:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   });

app.listen(port, () => {
    console.log(`Port is Connected on ${port}`);
})