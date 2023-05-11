const { checkIfRevewIdExists, checkIfUserExists } = require("../db/seeds/utils")
const { fetchReviewById, fetchReviews, fetchReviewCommentsById, addCommentByReviewId} = require("../models/review.models")


exports.getReviewById = (req, res, next) => {
    const {review_id} = req.params
    checkIfRevewIdExists(review_id).catch(err => next(err))
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
        checkIfRevewIdExists(review_id).catch(err => next(err))
        fetchReviewCommentsById(review_id).then(result => {
        res.status(200).send({comments : result})
    }).catch(err => {
        next(err)
    })
}

exports.postCommentByReviewId = (req, res, next)=>{
    const {review_id} = req.params
    const {username} = req.body
    const newComment = req.body
    Promise.all([checkIfUserExists(username),checkIfRevewIdExists(review_id)]).catch(err => next(err))
    addCommentByReviewId(review_id, newComment).then(result => {
        res.status(201).send({newPost : result})
    }).catch(err => {
        next(err)
    })
}