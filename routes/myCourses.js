var express = require('express');
var router = express.Router();
const {APP_NAME} = process.env;
const myCoursesHandler = require('./handler/my-courses');
const verifyToken = require('../middlewares/verifyToken');


router.post('/', myCoursesHandler.create);
router.get('/', myCoursesHandler.get);
//router.delete('/:id', imageCoursesHandler.destroy);

module.exports = router;