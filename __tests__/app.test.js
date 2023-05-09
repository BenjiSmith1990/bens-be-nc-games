const request = require('supertest')
const connection = require('../db/connection')
const {app} = require('../app/app.js')
const {categoryData, reviewData, userData, commentData } = require('../db/data/test-data/index.js')
const seed = require('../db/seeds/seed')

afterAll(()=>{
    connection.end()
})

beforeEach(()=>{
    return seed({categoryData, reviewData, userData, commentData})
})

describe.only('GET /api/categories', () => {
    test.only('/api/categories - status 200 - respond with an array of category objects, each should have a slug and description property', () => {
        return request(app).get('/api/categories').expect(200).then((response) => {
            expect(response.body.categories.length).toBe(4)
            response.body.categories.forEach(item => {
                expect(typeof item.slug).toBe('string')
                expect(typeof item.description).toBe('string')
            })
        })
    })
})