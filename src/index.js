// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from "./app.js"

// dotenv doesnt works with import that why this is neede to work with import
dotenv.config({
    path:'./env'
})


connectDB()

// after creating app.js kyunki isme db connect krne mei we used async code therefore it promises to return value that is handeled 
// by this
.then(() =>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!!", err);
})














/* 1st approach
import express from "express"
const app =express()

(async() => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/$
            {DB_NAME}`)
            app.on("error", (error)=>{
                console.log("ERROR: ", error);
                throw error
            })

            app.listen(process.env.PORT, ()=>{
                console.log(`App is listening on port ${process.env.PORT}`)
            })
    }
    catch(error){
        console.error("ERROR: ", error)
        throw err
    }
})()*/
