const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {getMain,postLogin,getLoginAdmin,getLoginInstructor,getAddFicha,postAddFicha} = require('../presentation/controller/user.controller')
const {authToken} = require('../middlewares/auth.middleware')
router.use(cookieParser());

router.get('/',getMain)
    .post('/login',postLogin)
    .get('/alerts',authToken,getLoginAdmin)
    .get('/getReports',authToken,getLoginInstructor)
    .get('/addFicha',authToken,getAddFicha)
    .post('/addFicha',authToken,upload.single("excel"),postAddFicha)
 
module.exports = router 