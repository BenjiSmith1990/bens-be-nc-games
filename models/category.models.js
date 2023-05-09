const connection = require('../db/connection.js')

exports.fetchCategories = () => {
    const queryStr = 'SELECT * FROM categories;'
    return connection.query(queryStr).then(result => {
        return result.rows
    })
}