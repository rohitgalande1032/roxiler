import express from 'express';
import mongoose from 'mongoose';
import transactionRoutes from "./routes/transaction.route.js"
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Hello Roxiler")
})

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to database")
})
.catch((err) => {
    console.log(err)
})

//Routes
app.use("/api/transactions", transactionRoutes)

app.listen(5000, ()=>{
    console.log("Listening on port 5000")
})