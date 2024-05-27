// require('dotenv').config()
import dotenv from "dotenv"
import express from "express"
import connectDB from "./db/index.js";
dotenv.config({
    path: './env'
})
connectDB()







// const app= express()
// (async ()=>{

//     try{
//         mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("Error in app: ",error);
//             throw error
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listing to port ${process.env.PORT}`)
//         })

//     }
//     catch(error){
//         console.error("Error in db connection: ", error)
//         throw error
//     }
// })()