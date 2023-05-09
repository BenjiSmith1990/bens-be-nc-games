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

describe('GET /api/categories', () => {
    test('/api/categories - status 200 - respond with an array of category objects, each should have a slug and description property', () => {
        return request(app).get('/api/categories').expect(200).then((response) => {
            expect(response.body.categories.length).toBe(4)
            response.body.categories.forEach(item => {
                expect(typeof item.slug).toBe('string')
                expect(typeof item.description).toBe('string')
            })
        })
    })
})

describe('GET /api', () => {
    test('/api - status -200 - respond with an object containing all the endpoints a user can make', () => {
        return request(app).get('/api').expect(200).then(response => {
            expect(typeof response.body.endpointData).toBe('object')
        })
    })
    test('/api - status -200 - respond with an object that has an endpoint key, the value of that key being a description key, query key and an example response key', () => {
        return request(app).get('/api').expect(200).then(response => {
        
        Object.values(response.body.endpointData).forEach(endpoint => {
            expect(endpoint.hasOwnProperty('description')).toBe(true)
            expect(endpoint.hasOwnProperty('queries')).toBe(true)
            expect(endpoint.hasOwnProperty('exampleResponse')).toBe(true)
        })
    })
    })
   
})