const { fetchReviewById, fetchReviewCommentsById } = require("../models/review.models")

exports.getReviewById = (req, res, next) => {
    const {review_id} = req.params
    fetchReviewById(review_id).then(result => {
        res.status(200).send({review : result})
    }).catch(err => {
        next(err)
    })
}

exports.getReviewsCommentsById = (req,res,next) =>{
    const {review_id} = req.params;
    console.log('in controller')
    fetchReviewCommentsById(review_id)
}