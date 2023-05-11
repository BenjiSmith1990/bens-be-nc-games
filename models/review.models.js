const connection = require('../db/connection.js')

exports.fetchReviewById = (review_id) => {
   

    const queryStr = `SELECT * FROM reviews WHERE review_id = $1;`

    return connection.query(queryStr, [review_id]).then(result => {
        if(result.rows.length === 0){
            return Promise.reject({status : 404, msg : 'Review Not Found!'})
        }
        return result.rows
    })
}

exports.fetchReviews = () => {
    const queryStr = `SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, COUNT(reviews.review_id) AS comment_count
    FROM reviews LEFT JOIN
        comments ON comments.review_id = reviews.review_id
    GROUP BY reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer
        ORDER BY created_at DESC;`

    return connection.query(queryStr).then(result => {
        return result.rows
    })
}

exports.fetchReviewCommentsById = (review_id) => {
    const queryStr = `SELECT * FROM comments WHERE review_id = $1;`

    return connection.query(queryStr, [review_id]).then(result => {
        if(result.rows.length === 0){
            return Promise.reject({status : 404, msg : 'Review Not Found!'})
        }
        return result.rows
    })
}
