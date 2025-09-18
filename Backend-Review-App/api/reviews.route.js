import express from "express"
import ReviewsCtrl from "./reviews.controller.js"
const router =express.Router()
router.route("/movie/:id").get(ReviewsCtrl.apiGetReviewsByMovieId)
//it wiil return all the reviews attached to specific movie
router.route("/new").post(ReviewsCtrl.apiPostReview)
//new review we use post request where post req is done when we create something new
router.route("/:id")
//it is review id
        .get(ReviewsCtrl.apiGetReview)
        //get request
        .put(ReviewsCtrl.apiUpdateReview)
        //put request
        .delete(ReviewsCtrl.apiDeleteReview)
        //delete request
export default router