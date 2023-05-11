const { fetchReviewById, fetchReviews, fetchReviewCommentsById} = require("../models/review.models")


exports.getReviewById = (req, res, next) => {
    const {review_id} = req.params
    fetchReviewById(review_id).then(result => {
        res.status(200).send({review : result})
    }).catch(err => {
        next(err)
    })
}

exports.getReviews = (req,res,net) => {
    fetchReviews().then(result => {
        res.status(200).send({reviews : result})
    })}
    
    exports.getReviewCommentsById = (req,res,next) =>{
        const {review_id} = req.params;
    fetchReviewCommentsById(review_id).then(result => {
        res.status(200).send({comments : result})
    }).catch(err => {
        next(err)
    })

}