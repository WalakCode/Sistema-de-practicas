const userService = require('../../business/services/user.services')
const fichaService = require('../../business/services/ficha.services')
const jwt = require("jsonwebtoken");


const getMain = async(req,res)=>{
    res.clearCookie('jwt');
    res.render('main.ejs')
}


const getLoginAdmin = async(req,res)=>{
    res.render('admin/admin_alerts')
}

const getAddFicha = async(req,res)=>{
    res.render('admin/admin_addFicha')
}

const postAddFicha = async(req,res)=>{
    const data = req.body
    const excel = req.file.path
    const result = await fichaService.getFichaExcel(data,excel)

}

const getLoginInstructor = async(req,res)=>{
    res.render('instructor/instructor_reports')

}



const postLogin = async(req,res)=>{
    const data = req.body
    const result = await userService.verifyUser(data.email,data.pass)
    if(result.status == 200){
        const info = result.info[0]

        const options = { expiresIn: "350m" };
        const token = jwt.sign(info,process.env.SK || 'CLAVESECRETA', options);
        res.cookie('jwt', token, { httpOnly: true, expiresIn: 350 * 60 });

        if(info.nombre_rol == 'Administrador'){
            res.render('admin/admin_alerts')
        }
        else if(info.nombre_rol == 'Instructor'){
            res.render('instructor/instructor_reports')
        }
    }else{
        res.redirect('/')
    }
}


module.exports = {
    getMain,
    postLogin,
    getLoginAdmin,
    getLoginInstructor,
    getAddFicha,
    postAddFicha
}