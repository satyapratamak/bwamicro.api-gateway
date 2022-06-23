var express = require('express');
var router = express.Router();
const {APP_NAME} = process.env;
const usersHandler = require('./handler/users');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   //res.send('respond with a resource');
//   res.send('media');
// });

router.post('/register', usersHandler.register);
//router.get('/', mediaHandler.getAll);
//router.delete('/:id', mediaHandler.destroy);

module.exports = router;
