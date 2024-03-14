const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser');
const {getMain,postLogin,getLoginAdmin,getLoginInstructor} = require('../presentation/controller/user.controller')
const {authToken} = require('../middlewares/auth.middleware')
router.use(cookieParser());

router.get('/',getMain)
    .post('/login',postLogin)
    .get('/alerts',authToken,getLoginAdmin)
    .get('/getReports',authToken,getLoginInstructor)
 
 
module.exports = router 