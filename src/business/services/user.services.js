const userRepository = require('../../persistence/repository/user.repository')

const verifyUser = async(email,pass)=>{
    if(email && pass){
        const result = await userRepository.getUser([email,pass])
        if(result){
            return {message:'si existe el usuario',info:result[0],status:200} 
        }else{
            return {message:'error en el servidor',status:500}
        }
    }else{
        return {message:'rellene los campos',status:400}
    }
    
}

module.exports = {
    verifyUser
}