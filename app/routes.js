var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
    res.send('Hello World')
})

var authController = require('./controllers/auth-controller');
router.post('/register', authController.register);
router.post('/authenticate', authController.authenticate);

var recipeController = require('./controllers/recipe-controller');
router.get('/recipes', recipeController.index);
router.get('/recipes/:slug', recipeController.show);
router.post('/recipes', recipeController.store);
router.put('/recipes/:slug', recipeController.update);
router.delete('/recipes/:slug', recipeController.destroy);

var mw = require('./middleware');
router.use('/api', mw.jwt);

var userController = require('./controllers/user-controller');
router.get('/api/users', userController.index);

module.exports = router;
