var express = require('express');
var router = express.Router();
const {APP_NAME} = process.env;
const reviewsHandler = require('./handler/reviews');
const verifyToken = require('../middlewares/verifyToken');

// router.get('/', lessonsHandler.getAll);
// router.get('/:id', lessonsHandler.get);


router.post('/', reviewsHandler.create);
router.put('/:id', reviewsHandler.update);
router.delete('/:id', reviewsHandler.destroy);


module.exports = router;