const userService = require('../../business/services/user.services')
const jwt = require("jsonwebtoken");


const getMain = async(req,res)=>{
    res.clearCookie('jwt');
    res.render('main.ejs')
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

const getLoginAdmin = async(req,res)=>{
    res.render('admin/admin_alerts')
}

const getLoginInstructor = async(req,res)=>{
    res.render('instructor/instructor_reports')

}



module.exports = {
    getMain,
    postLogin,
    getLoginAdmin,
    getLoginInstructor
}