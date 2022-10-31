const express = require("express");
const mongoose = require("mongoose");
const tasks = require("./routes/tasks.js");
const connectDB = require("./db/connect.js");
require("dotenv").config();
const notFound = require("./middleware/not-found.js")
const errorHandlerMiddleware = require("./middleware/error-handler.js")


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static("./public"));

app.use(express.json());

app.use("/api/v1/tasks", tasks);

app.use(notFound);

app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, console.log(`Server is listening on PORT ${PORT}`));
    } catch (error) {
     console.log(error)   
    }
}

start();