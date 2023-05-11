const express = require('express')
const { getEndpoints } = require('../controllers/api.controller')
const { getCategories } = require('../controllers/catergory.controllers')
const { getReviewById, getReviews, getReviewCommentsById, postCommentByReviewId } = require('../controllers/review.controllers')
const app = express()

app.use(express.json())

app.get('/api/categories', getCategories)

app.get('/api', getEndpoints)

app.get('/api/reviews/:review_id', getReviewById)


app.get('/api/reviews', getReviews)

app.get('/api/reviews/:review_id/comments', getReviewCommentsById)

app.post('/api/reviews/:review_id/comments', postCommentByReviewId)

app.use((err, req, res, next) => {
    if(err.code === '22P02'){
        res.status(400).send({msg : 'Bad Request!'})
    }else {
        next(err)
    }
})
app.use((err,req,res,next)=>{
    if(err.status && err.msg){
        res.status(err.status).send({msg : err.msg})
    }
    else(
        next(err)
        )
    })
    
app.use((err, req, res, next) => {
   
        res.status(500).send({msg : 'Internal Server Error!'})
    
})

module.exports = {app}