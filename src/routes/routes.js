const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {getMain,postLogin,getLoginAdmin,getLoginInstructor,getAddFicha,postAddFicha} = require('../presentation/controller/user.controller')
const {authToken} = require('../middlewares/auth.middleware')
const {unexpectedFile} = require('../middlewares/multer.middleware')
const {validateAddFichaInputs} = require('../middlewares/addficha.middleware')
router.use(cookieParser());

router.get('/',getMain)
    .post('/login',postLogin)
    .get('/alerts',authToken,getLoginAdmin)
    .get('/getReports',authToken,getLoginInstructor)
    .get('/addFicha',authToken,getAddFicha)
    .post('/addFicha',authToken,upload.single("excel"),validateAddFichaInputs,unexpectedFile,postAddFicha)
 
module.exports = router 