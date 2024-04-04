const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {getMain,postLogin,getLoginAdmin,getLoginInstructor,getAddFicha,postAddFicha,postUpdateModal,postDeleteModal,getAprendices} = require('../presentation/controller/user.controller')
const {authToken} = require('../middlewares/auth.middleware')
const {unexpectedFile} = require('../middlewares/multer.middleware')
const {validateAddFichaInputs} = require('../middlewares/addficha.middleware')
const {currentUrl} = require('../middlewares/navbar.middleware')
router.use(cookieParser());

router.get('/',currentUrl,getMain)
    .post('/login',currentUrl,postLogin)
    .get('/alerts',authToken,currentUrl,getLoginAdmin)
    .get('/getReports',authToken,currentUrl,getLoginInstructor)
    .get('/addFicha',authToken,currentUrl,getAddFicha)
    .post('/addFicha',authToken,currentUrl,validateAddFichaInputs,postAddFicha)
    .post('/updateFicha',authToken,currentUrl,validateAddFichaInputs,postUpdateModal)
    .post('/deleteFicha',authToken,currentUrl,postDeleteModal)
    .post('/getAprendices',authToken,currentUrl,getAprendices)
    .post('/postAprendices',authToken,currentUrl)
 
module.exports = router 