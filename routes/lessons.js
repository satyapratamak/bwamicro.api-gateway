var express = require('express');
var router = express.Router();
const {APP_NAME} = process.env;
const lessonsHandler = require('./handler/lessons');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', lessonsHandler.getAll);
router.get('/:id', lessonsHandler.get);


router.post('/', lessonsHandler.create);
router.put('/:id', lessonsHandler.update);
router.delete('/:id', lessonsHandler.destroy);


module.exports = router;
