const express = require('express');
const router = express.Router();
const reviewController = require('./reviewController');

router
  .route('/')
  .get(reviewController.getAllReviews); 

router
  .route('/:id')
  .put(reviewController.updateReview)    
  .delete(reviewController.deleteReview); 

router
  .route('/:id/verified')
  .patch(reviewController.verifyReview); 

module.exports = router;
