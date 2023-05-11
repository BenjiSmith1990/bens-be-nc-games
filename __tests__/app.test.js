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
describe('GET - /api/reviews', () => {
    test('/api/reviews - status 200 - responds with an array', () => {
        return request(app).get('/api/reviews').expect(200).then(result => {
            expect(Array.isArray(result.body.reviews)).toBe(true)
        })
    })
    test('/api/reviews - status 200 - responds with an array of object, each object should have 9 keys', () => {
        return request(app).get('/api/reviews').expect(200).then(result => {
            result.body.reviews.forEach(review => {
                expect(Object.keys(review).length).toBe(9)
                expect(typeof review.owner).toBe('string')
                expect(typeof review.title).toBe('string')
                expect(typeof review.review_id).toBe('number')
                expect(typeof review.category).toBe('string')
                expect(typeof review.review_img_url).toBe('string')
                expect(typeof review.created_at).toBe('string')
                expect(typeof review.votes).toBe('number')
                expect(typeof review.designer).toBe('string')
                expect(typeof review.comment_count).toBe('string')
            })
        })
    })
})


describe('GET - /api/reviews', () => {
    test('/api/reviews - status 200 - responds with an array', () => {
        return request(app).get('/api/reviews').expect(200).then(result => {
            expect(Array.isArray(result.body.reviews)).toBe(true)
        })
    })
    test('/api/reviews - status 200 - responds with an array of object, each object should have 9 keys', () => {
        return request(app).get('/api/reviews').expect(200).then(result => {
            result.body.reviews.forEach(review => {
                expect(Object.keys(review).length).toBe(9)
                expect(typeof review.owner).toBe('string')
                expect(typeof review.title).toBe('string')
                expect(typeof review.review_id).toBe('number')
                expect(typeof review.category).toBe('string')
                expect(typeof review.review_img_url).toBe('string')
                expect(typeof review.created_at).toBe('string')
                expect(typeof review.votes).toBe('number')
                expect(typeof review.designer).toBe('string')
                expect(typeof review.comment_count).toBe('string')
            })
        })
    })
    test('/api/reviews - status 200 - responds with a sorted array by created_at', () => {
        return request(app).get('/api/reviews').expect(200).then(result => {
            expect(result.body.reviews).toBeSortedBy('created_at', {descending : true, coerce : true})
        })
    })
})
describe.only('Get - /api/reviews/review_id/comments', () => {
    test('/api/reviews/2/comments - status 200 - with a response array of all the comments for that review_id (2 in this case)', () => {
         return request(app).get('/api/reviews/2/comments').expect(200).then(result => {
            expect(result.body.comments.length).toBe(3)
            result.body.comments.forEach(comment => {
                expect(Object.keys(comment).length).toBe(6)
                expect(typeof comment.comment_id).toBe('number')
                expect(typeof comment.votes).toBe('number')
                expect(typeof comment.created_at).toBe('string')
                expect(typeof comment.author).toBe('string')
                expect(typeof comment.body).toBe('string')
                expect(typeof comment.review_id).toBe('number')
            })
         })
     })
     test('/api/reviews/nonesense/comments - status 400 - with a "bad Request! message', () => {
        return request(app).get('/api/reviews/nonsense/comments').expect(400).then(result => {
            expect(result.body.msg).toBe('Bad Request!')
        })
     })
     test.only('/api/reviews/100000/comments - status 404 - with a "Review Not Found! message', () => {
        return request(app).get('/api/reviews/1000000/comments').expect(404).then(result => {
            expect(result.body.msg).toBe('Review Not Found!')
        })
     })
})

