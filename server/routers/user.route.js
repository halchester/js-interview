const userController = require('../controllers/user.controller');
const router = require('express').Router();

router.get('/api/fetch', userController.getAllRandomThings);
router.post('/api/signup', userController.registerUser);
router.post('/api/process', userController.processThing);

module.exports = router;
