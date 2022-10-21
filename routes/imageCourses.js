var express = require('express');
var router = express.Router();
const {APP_NAME} = process.env;
const imageCoursesHandler = require('./handler/image-courses');
const verifyToken = require('../middlewares/verifyToken');


router.post('/', imageCoursesHandler.create);
//router.put('/:id', lessonsHandler.update);
router.delete('/:id', imageCoursesHandler.destroy);

module.exports = router;