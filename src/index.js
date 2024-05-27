// require('dotenv').config()
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import app from "./app.js";
dotenv.config({
    path: './env'
})
connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("Error in app: ",error);
        throw error
    })
    app.listen(process.env.PORT || 8000, ()=>{
        console.log("server running at port 8000")
    })
})
.catch((err)=>{
    console.log("mongo db connection failed",err);
})








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