\c nc_games

-- SELECT comments.review_id, comments.created_at FROM comments ORDER BY created_at DESC;
-- SELECT * FROM reviews;
-- SELECT * FROM comments;
-- SELECT * FROM users;
-- SELECT * FROM categories;
SELECT * FROM comments

-- SELECT * FROM reviews WHERE review_id = 2;

-- SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer FROM reviews ;

SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer, COUNT(reviews.review_id)
FROM
    reviews LEFT JOIN
    comments ON comments.review_id = reviews.review_id
GROUP BY reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, reviews.designer
    ORDER BY created_at DESC

