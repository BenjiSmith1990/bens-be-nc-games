const express = require('express')
const { getEndpoints } = require('../controllers/api.controller')
const { getCategories } = require('../controllers/catergory.controllers')
const app = express()

app.use(express.json())

app.get('/api/categories', getCategories)

app.get('/api', getEndpoints)


app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({msg : 'Internal Server Error!'})
})

module.exports = {app}