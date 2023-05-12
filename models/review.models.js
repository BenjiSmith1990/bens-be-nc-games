const connection = require('../db/connection.js')


exports.fetchReviewById = (review_id) => {
   

    const queryStr = `SELECT * FROM reviews WHERE review_id = $1;`

    return connection.query(queryStr, [review_id]).then(result => {
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
    const queryStr = `SELECT * FROM comments WHERE review_id = $1 ORDER BY created_at DESC;`

    return connection.query(queryStr, [review_id]).then(result => {
        return result.rows
    })
}

exports.addCommentByReviewId = (review_id, newComment) => {
    const {username, body} = newComment
    if(!body){
        return Promise.reject({status: 400, msg : 'Please provide a comment'})
     }
    const queryStr = `INSERT INTO comments
                        (body, author, review_id)
                        VALUES
                        ($1, $2, $3) RETURNING *;`
    

        return connection.query(queryStr, [body, username, review_id]).then(result => {
            return result.rows
        })
}

exports.updateVotesById = (review_id, inc_votes) => {
   
    const queryStr = `UPDATE reviews
                      SET votes = votes + $1 WHERE review_id = $2 RETURNING *;`
    return connection.query(queryStr,[inc_votes, review_id]).then(result => {
        return result.rows
    })
}
