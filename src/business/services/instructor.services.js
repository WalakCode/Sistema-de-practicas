const instructorRepository = require('../../persistence/repository/instructor.repository')

const addInstructor = async (data)=>{
    console.log(data)
    const result = await instructorRepository.addInstructor(data)
    if(!result){
        return { message: "error en el servidor", status: 500 };
    }
    return { message: "exito", status: 200 };


}

module.exports = {
    addInstructor
}

