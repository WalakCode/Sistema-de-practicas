function verAprendices(id) {
    console.log(id)
}

function eliminarFicha(id) {
    
    const hidden = document.getElementById('hiddenDelete')
    hidden.value = id

    var myModal = new bootstrap.Modal(document.getElementById('miModalDelete'));
    myModal.show();

 }
 
 function editarFicha(id,nombre,ficha,nivel,final) {

     var myModal = new bootstrap.Modal(document.getElementById('miModal'));

     const nombreFicha = document.getElementById('nombre')
     const idDelSelectmodal = document.getElementById('idDelSelectmodal')
     const idficha = document.getElementById('idficha')
     const finallect = document.getElementById('finallect')
     const hidden = document.getElementById('hidden')
    
     nombreFicha.value = nombre

     switch (nivel) {
        case 'Auxiliar':
            idDelSelectmodal.value = 1
            break;
        case 'Operario':
            idDelSelectmodal.value = 2
            break;
        case 'Técnico':
            idDelSelectmodal.value = 3
            break;
        case 'Tecnólogo':
            idDelSelectmodal.value = 4
            break;
        default:
            idDelSelectmodal.value = 0
            break;
     }
    

     idficha.value = ficha
     finallect.value = final
     hidden.value = id
     myModal.show();
 }  
 










