import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js";

import dotenv from "dotenv"
//DAO stands for data access objects
//enviorment variabale
dotenv.config({ path: "./mong.env" });
console.log("ENV MONGO_DB",process.env.MONGO_DB)
const MongoClient=mongodb.MongoClient
const mongo_username=process.env.MONGO_USER;
const mongo_password=process.env.MONGO_PASS;
const url=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}` +
            `@cluster0.dr4upvh.mongodb.net/${process.env.MONGO_DB}` +
            `?retryWrites=true&w=majority&appName=Cluster0`;
const port =8000
MongoClient.connect(
    url,
    {maxPoolSize:50,
        //wtimeoutMS:2500,
        //useNewUrlParser:true

    }
)
.catch(err => {
    console.error(err.stack);
    process.exit(1)
})
//the async function can run asynchronously while other function are running 
//we are using it for you wait for something till something else happens
.then(async client=>{
    await ReviewsDAO.injectDB(client)
    //we are connecting our database with index.js
    
    app.listen(port, () =>{
        console.log(`listening on port ${port}`)
    })
})
