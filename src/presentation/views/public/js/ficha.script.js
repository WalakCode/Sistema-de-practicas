const baseUrl = "http://localhost:8080/"

window.addEventListener('DOMContentLoaded', inicializarModal);

function inicializarModal() {
    // Seleccionar el modal por su ID
    const modal = document.getElementById('miModalAprendices');
  
    // Agregar un listener al evento 'hidden.bs.modal'
    modal.addEventListener('hidden.bs.modal', function () {
      const tableBody = document.getElementById('tableBody');
      tableBody.innerHTML = '';
    });
  }


function eliminarAprendices(){
  console.log('asd')
  const myModal = new bootstrap.Modal(document.getElementById('modalEliminarAprendices'));
  const idfichaver = document.getElementById('idfichaver')
  const idfichaEliminarver = document.getElementById('idfichaEliminarver')

  idfichaEliminarver.value = idfichaver.innerText
  myModal.show();
}

function agregarAprendices(ficha,id){
  const idinput = document.getElementById('idhidd')
  idinput.value = id
  const myModal = new bootstrap.Modal(document.getElementById('modalAgregarAprendices'));

  const titulo = document.getElementById('tituloAggApr')
  titulo.textContent = ficha
  myModal.show();

}

function agregarFicha(){

  const myModal = new bootstrap.Modal(document.getElementById('modalAgregar'));
  
  myModal.show();
}



function verAprendices(id,nombre,idficha,nivel,final) {
    const myModal = new bootstrap.Modal(document.getElementById('miModalAprendices'));
    const nombreTitulo = document.getElementById('titulo')
    const idFichaModal = document.getElementById('idFichaModal')
    const nivelModalficha = document.getElementById('nivelModalficha')
    const finalLectModal = document.getElementById('finalLectModal')
    const idfichaver = document.getElementById('idfichaver')

    idFichaModal.textContent = "Ficha: " + idficha
    nivelModalficha.textContent = "Nivel de formacion: " + nivel
    finalLectModal.textContent = "Final de la etapa lectiva: " + final
    nombreTitulo.textContent = "Ficha de Caracterización: "+nombre
    idfichaver.textContent = id

    const url = baseUrl + "getAprendices"
    axios.post(url,{ idFicha: id })
    .then(response => {
      const data = response.data;
      
      const tableBody = document.getElementById('tableBody');
      data.forEach(item => {
        const tr = document.createElement('tr');

        const tdTipoDocumento = document.createElement('td');
        tdTipoDocumento.textContent = item.tipo_documento;
        tr.appendChild(tdTipoDocumento);
  
        const tdNumeroDocumento = document.createElement('td');
        tdNumeroDocumento.textContent = item.numero_documento;
        tr.appendChild(tdNumeroDocumento);
  
        const tdNombres = document.createElement('td');
        tdNombres.textContent = item.nombres;
        tr.appendChild(tdNombres);
  
        const tdApellidos = document.createElement('td');
        tdApellidos.textContent = item.apellidos;
        tr.appendChild(tdApellidos);
  
        const tdCelular = document.createElement('td');
        tdCelular.textContent = item.celular;
        tr.appendChild(tdCelular);
  
        const tdCorreoPersonal = document.createElement('td');
        tdCorreoPersonal.textContent = item.correo_personal;
        tr.appendChild(tdCorreoPersonal);
  
        const tdEstado = document.createElement('td');
        tdEstado.textContent = item.estado;
        tr.appendChild(tdEstado);
  
        tableBody.appendChild(tr);
      });
      
    })
    .catch(error => {
      console.error('Error al hacer la solicitud POST:', error);
    });

    myModal.show();

   
}

function eliminarFicha(id) {
    
    const hidden = document.getElementById('hiddenDelete')
    hidden.value = id

    var myModal = new bootstrap.Modal(document.getElementById('miModalDelete'));
    myModal.show();

 }
 
 function editarFicha(id,nombre,ficha,nivel,final,estadoFicha) {

     const myModal = new bootstrap.Modal(document.getElementById('miModal'));

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


 
 










