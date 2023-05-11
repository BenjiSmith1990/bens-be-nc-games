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

describe('GET /api/reviews/:review_id', () => {
    test('/api/reviews/2 - status 200 - responds with an object containing 9 properties', ()=> {
        return request(app).get('/api/reviews/2').expect(200).then(result => {
            expect(Object.keys(result.body.review[0]).length).toBe(9)
        })
    })
    test('/api/reviews/2 - status 200 - responds with an object containing 9 properties, with the review_id to be 2', ()=> {
        return request(app).get('/api/reviews/2').expect(200).then(result => {
            expect(result.body.review[0].review_id).toBe(2)
        })
    })
    test('/api/reviews/2 - status 200 - responds with an object containing 9 properties (review_id, title, review_body, designer, review_img_url, votes, category, owner and created_at)', ()=> {
        return request(app).get('/api/reviews/2').expect(200).then(result => {
                expect(typeof result.body.review[0].review_id).toBe('number')
                expect(typeof result.body.review[0].title).toBe('string')
                expect(typeof result.body.review[0].review_body).toBe('string')
                expect(typeof result.body.review[0].designer).toBe('string')
                expect(typeof result.body.review[0].review_img_url).toBe('string')
                expect(typeof result.body.review[0].votes).toBe('number')
                expect(typeof result.body.review[0].category).toBe('string')
                expect(typeof result.body.review[0].owner).toBe('string')
                expect(typeof result.body.review[0].created_at).toBe('string')
        })
    })
})

describe('GET - /api/reviews/nonsense', () => {
    test('/api/reviews/nonsense - status - 400 - with a message of "Bad Request', () => {
        return request(app).get('/api/reviews/nonsense').expect(400).then(result => {
            expect(result.body.msg).toBe('Bad Request!')
        })
    })
})
describe('GET - /api/reviews/1000000', () => {
    test('/api/reviews/1000000 - status - 404 - with a message of "Review Not Found', () => {
        return request(app).get('/api/reviews/1000000').expect(404).then(result => {
            expect(result.body.msg).toBe('Review Not Found!')
        })
    })
})
describe.only('Get - /api/reviews/review_id/comments', () => {
    test.only('/api/reviews/2/comments - status 200 - with a response array of all the comments for that review_id (2 in this case)', () => {
     
    })
})
