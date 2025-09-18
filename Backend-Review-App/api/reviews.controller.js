import { json } from "express"
import ReviewsDAO from "../dao/reviewsDAO.js";
//getting information from the route it is sending it to dao which will
//get information from the database
export default class ReviewsController{
    static async apiPostReview(req , res , next){
        //static function which we can access through reviews controller if it is not then 
        //we have to create an instance for this function
        
        try{
            const movieId= req.body.movieId
            //body of req json the url request or http request
            const review= req.body.review
            const user= req.body.user
            const reviewResponse= await ReviewsDAO.addReview(
                movieId,
                user,
                review
            )
            res.json({status:"success"})
        }
        catch(e){
            res.status(500).json({error:e.message})
            
        }
    }
    static async apiGetReview(req, res ,next){
        try{
            let id=req.params.id || {}
            //we are going to get the id or empty obj
            let review=await ReviewsDAO.getReview(id)
            //we wait for review
            if(!review){
                res.status(404).json({error:"Not Found"})
                return
                //if there is no review then give error
            }
            res.json(review)
            //review response
        }catch(e){
            console.log(`api.${e}`)
            res.status(500).json({error: e.message})
        }
    }
    static async apiGetReviewsByMovieId(req, res) {
    try {
      const movieId = req.params.id
      const reviews = await ReviewsDAO.getReviewsByMovieId(movieId)
      res.json(reviews)
    } catch (e) {
      console.error(`apiGetReviewsByMovieId error: ${e}`)
      res.status(500).json({ error: e.message })
    }
  }
    static async apiUpdateReview(req,res,next){
        try{
            const reviewId=req.params.id
            const review=req.body.review
            const user=req.body.user
            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                user,
                review
            )
            var{error} = reviewResponse
            if (reviewResponse.error){
                res.status(400).json({error: reviewResponse.error})
            }
            if (reviewResponse.modifiedCount===0){
                
                 return res.status(404).json({ error: "Unable to update review" }) // ✅ return
                
            }
            res.json({status: "success"})
        }catch(e){
            res.status(500).json({error:e.message})
        }
    }
    static async apiDeleteReview(req, res, next){
        try{
            const reviewId=req.params.id
            const reviewResponse= await
    ReviewsDAO.deleteReview(reviewId)
            res.json({status: "success"})
        }catch(e){
            res.status(500).json({error:e.message})
        }
    }
   
}