const express = require('express')
const router = express.Router()
const {getMain} = require('../presentation/controller/user.controller')

router.get('/',getMain) 
 
 
module.exports = router 