const {Router}= require('express');
const {login} = require('../controls/auth.js');


const router = Router();

// auth site routes
router.post('/login', login);


//export default router;
module.exports = {router};