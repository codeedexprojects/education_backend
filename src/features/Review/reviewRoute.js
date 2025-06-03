const express = require('express');
const router = express.Router();
const reviewController = require('./reviewController');

router
  .route('/')
  .get(reviewController.getAllReviews); 

router
  .route('/:id')
  .put(reviewController.editReview)    
  .delete(reviewController.deleteReview); 

router
  .route('/:id/verified')
  .patch(reviewController.approveReview); 

module.exports = router;
