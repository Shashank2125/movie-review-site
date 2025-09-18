//connecting with database
import mongodb from "mongodb"
const ObjectId=mongodb.ObjectId
//access to objectid we are going to be text and int from backend to our database
//we are searching for a record in our database we have to search by datatype by objectid
let reviews
export default class ReviewsDAO{
    static async injectDB(conn){
        if (reviews){
            return
            //if already db connection return do nothing
        }
        //if not
        try{
            console.log("connecting to DB",process.env.MONGO_DB)
            reviews = await conn.db(process.env.MONGO_DB).collection("reviews");

            //we will get collection and db called reviews
            //mongo db has multiple collection smaller db in a large db is collection
        }
        catch(e){
            console.error(`unsble to enstablish connectionin userDAO: ${e}`)
        }
    }
    static async addReview(movieId, user, review){
        //we already passed the functon previously which is in review.collector.js
        //we are going to recive movieid user and review
        try{
            //create our doc with key value pair
            const reviewDoc={
                movieId: movieId,
                user: user,
                review: review,
            }
            return await reviews.insertOne(reviewDoc)
            //it is a mongodb command on how we insert a document in mongodb

        }catch(e){
            console.error(`unable to post review: ${e}`)
            return {error: e}
        }
    }
    static async getReview(reviewId){
        try{
            return await reviews.findOne({_id:new  ObjectId(reviewId)})

        }catch(e){
            console.error(`unable to get review: ${e}`)
            return {error:e.message}
        }
    }
    static async updateReview(reviewId,user,review){
        console.log("rev",reviewId)
        try{
            const updateResponse =await reviews.updateOne(
                {_id: new  ObjectId(reviewId)},
                { $set: {user:user, review:review}}
                
            )
            return updateResponse
        }catch(e){
            console.error(`unable to update review:${e}`)
            return {error:e}
        }
    }
    static async deleteReview(reviewId){
        try{
            const deleteResponse=await reviews.deleteOne({
                _id:new ObjectId(reviewId)
            })
            return deleteResponse
        }catch(e){
            console.error(`unable to delete review:${e}`)
            return{error:e}
        }
    }
    static async getReviewsByMovieId(movieId){
        console.log("mov",movieId)
        try{
            const cursor=await reviews.find({movieId: parseInt(movieId)})
            //when we get a cursor where we find movie -movie id which is a 
            //string but the parseint function which will convert it into int
            return cursor.toArray()
            //we convert the int to array 

        }catch(e){
            console.error(`Unable to get review:${e}`)
            return {error:e.message}
        }
    }
}