// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDByVmOjKmVGlkocFS2Pp6G4-BjYweANhg",
    authDomain: "fir-chat-7e9b4.firebaseapp.com",
    projectId: "fir-chat-7e9b4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let tabla = document.getElementById('tabla');

// Agregar Documentos
const guardar = () => {

    let nombre = document.getElementById('nombre');
    let apellido = document.getElementById('apellido');
    let fecha = document.getElementById('fecha');

    db.collection("users").add({
        first: nombre.value,
        last: apellido.value,
        born: fecha.value
    })
    .then(function(docRef){
        console.log("Document wirtten with ID: ", docRef.id);
        nombre.value = '';
        apellido.value = '';
        fecha.value = '';
    })
    .catch(function(error){
        console.error("Error adding docuemnt: ", error);
    });
};

// Leer documentos
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        tabla.innerHTML += `<tr>
                                <th scope="row">${doc.id}</th>
                                <td>${doc.data().first}</td>
                                <td>${doc.data().last}</td>
                                <td>${doc.data().born}</td>
                                <td>
                                    <button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button>
                                </td>
                                <td>
                                    <button class="btn btn-warning" onclick="editar('${doc.id}', '${doc.data().first}', '${doc.data().last}', '${doc.data().born}')">Editar</button> 
                                </td>
                            </tr>`;
    });
});

// Borrar Documentos
const eliminar = (id) => {
    db.collection("users").doc(id).delete()
        .then(function() {
            console.log("Document succesfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
};

// Editar Documentos
const editar = (id, nombre, apellido, fecha) => {
    
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('fecha').value = fecha;
    let boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = () => {
        let washingtonRef = db.collection("users").doc(id);

        let nombre = document.getElementById('nombre');
        let apellido = document.getElementById('apellido');
        let fecha = document.getElementById('fecha');

        return washingtonRef.update({
            first: nombre.value,
            last: apellido.value,
            born: fecha.value
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Guardar';
            boton.onclick=function(){
                guardar();
            }
            nombre.value = '';
            apellido.value = '';
            fecha.value = '';
        })
        .catch(function(error) {
            console.error("There was an error ", error);
        });
    };

};