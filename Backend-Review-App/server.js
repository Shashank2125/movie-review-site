import express from "express";
import cors from "cors" 
import reviews from "./api/reviews.route.js"

const app=express()

app.use(cors())
app.use(express.json())
//it will alow json in the body of request
//if thier is git or post request they can read json


app.use("/api/v1/reviews",reviews)//best practices to declare api and version of api as v1
//we will use route from reviews
app.use((req,res) => res.status(404).json({error: "not found"}))
//it sjows when we go to the web browser which is not included here
export default app


//req=request res=resposne
