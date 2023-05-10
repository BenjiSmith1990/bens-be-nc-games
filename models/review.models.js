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
