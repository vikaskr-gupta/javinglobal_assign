import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import dotenv from "dotenv";
import cors from "cors";
import empRoute from "./routes/employees.js";
import userRoute from "./routes/users.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();


const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

mongoose.connect(URL)
    .then(() => {
        console.log("DB connected successfully");
    }).catch(error => console.log(error));


app.use("/emp", empRoute);
app.use("/user", userRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})