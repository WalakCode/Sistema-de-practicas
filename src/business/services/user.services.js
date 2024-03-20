const userModel = require('../../persistence/repository/user.repository')

const verifyUser = async(email,pass)=>{
    const result = await userModel.getUser([email,pass])
    if(result){
        return {message:'si existe el usuario',info:result[0],status:200} 
    }else{
        return {message:'error en el servidor',status:500}
    }
}

module.exports = {
    verifyUser
}