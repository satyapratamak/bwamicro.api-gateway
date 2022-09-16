var express = require('express');
var router = express.Router();
const {APP_NAME} = process.env;
const mentorsHandler = require('./handler/mentors');
//const verifyToken = require('../middlewares/verifyToken');


router.get('/', mentorsHandler.getAll);
router.get('/:id', mentorsHandler.get);
router.post('/', mentorsHandler.create);
router.put('/:id', mentorsHandler.update);
router.delete('/:id', mentorsHandler.destroy);
// router.get('/', verifyToken, mediaHandler.getAll);
// router.delete('/:id', mediaHandler.destroy);

module.exports = router;
