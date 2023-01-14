

onload = async () => {
     fetchApi()
    //setInterval(fetchApi, 1000)

    document.querySelector("#form").addEventListener("submit", e => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        console.log(data["nombre"])
        fetchInsert(data)
    })
}



function crearAlumnos (response){
    console.log(response)
    let alumnosContainer = document.getElementById("alumnosContainer")
    alumnosContainer.innerHTML = ""

    for (let i = 0; i < response.length; i++) {
        let divAlumno = document.createElement("div")
        divAlumno.setAttribute("id", "divAlumno")
        let divBotones = document.createElement("div")
        divBotones.setAttribute("id", "divBotones")
        let spanNombre = document.createElement("span")
        let spanEdad = document.createElement("span")
        let spanIdAl = document.createElement("span")
        let spanIdCur = document.createElement("span")

        spanNombre.innerText = "Nombre: " + response[i].nombre
        spanEdad.innerText = "Edad: " + response[i].edad
        spanIdAl.innerText = "Id Alumno: " + response[i].id_al
        spanIdCur.innerText = "Id Curso: " + response[i].id_curso
        spanNombre.setAttribute("id", "nombre")
        spanIdAl.setAttribute("id", "idAl")
        spanEdad.setAttribute("id", "edad")
        spanIdCur.setAttribute("id","idCurso")
        divAlumno.appendChild(spanNombre)
        divAlumno.appendChild(spanEdad)
        divAlumno.appendChild(spanIdAl)
        divAlumno.appendChild(spanIdCur)
        
        let spanBotones =document.createElement("span")
        spanBotones.setAttribute("id", "spanBotones")
        spanBotones.insertAdjacentElement("beforeend",createBotonEliminar())
        spanBotones.insertAdjacentElement("beforeend",createBotonEdit())

        divAlumno.appendChild(spanBotones)
        document.getElementById("alumnosContainer").appendChild(divAlumno)
    }
} 

function createBotonEliminar(){
    let botonBorrar = document.createElement("button")
    let imgButton = document.createElement("img")
    imgButton.setAttribute("src","../IMG/borrar.svg")
    imgButton.setAttribute("id", "deleteButton")
    botonBorrar.appendChild(imgButton)
    botonBorrar.setAttribute("id", "botonBorrar")
    botonBorrar.addEventListener("click", e=>{
        let container = e.target.closest("div")
        let usuario = Number(container.querySelector("span#idAl").innerText.split(":")[1])
        fetchDelete(usuario)
        setTimeout(fetchApi, 100)
    })
    return botonBorrar
}

function createBotonEdit(){
    let crearEdit = document.createElement("button")
    let imgButton = document.createElement("img")
    imgButton.setAttribute("src","../IMG/edit.svg")
    imgButton.setAttribute("id", "editButton")
    crearEdit.appendChild(imgButton)
    crearEdit.setAttribute("id", "botonEditar")
    crearEdit.addEventListener("click", e=>{
        let container = e.target.closest("div")
        cambiarCampo(container)
    })
    return crearEdit
}

function cambiarCampo(div){
    let nombre = div.querySelector("span#nombre").innerText.split(":")[1]
    let idAl = div.querySelector("span#idAl").innerText.split(":")[1]
    let idCurso = div.querySelector("span#idCurso").innerText.split(":")[1]
    let edad = div.querySelector("span#edad").innerText.split(":")[1]
    let previousData={
        idAl: idAl,
        nombre: nombre,
        idCurso: idCurso,
        edad: edad
    }
    div.innerHTML = ""
    let formNuevo = document.createElement("form") 
    formNuevo.setAttribute("id", "formEditable")
    formNuevo.addEventListener("submit", (e)=>{
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        console.log(data)
        fetchUpdateUser(data)
        setTimeout(fetchApi, 100)
    })

    let inputIdAl = document.createElement("input")
    let inputNombre = document.createElement("input")
    let inputIdCurso = document.createElement("input")
    let inputEdad = document.createElement("input")

    let labelIdAl = document.createElement("label")
    let labelNombre = document.createElement("label")
    let labelEdad = document.createElement("label")
    let labelIdCuso = document.createElement("label")

    let spanLabelInputIdAl = document.createElement("span")
    let spanLabelInputNombre = document.createElement("span")
    let spanLabelInputEdad = document.createElement("span")
    let spanLabelInputIdCurso = document.createElement("span")
    
    inputIdAl.setAttribute("value", previousData.idAl)
    inputIdAl.setAttribute("type","text")
    inputIdAl.setAttribute("name", "idAl")
    inputIdAl.setAttribute("readOnly", "true")
    
    inputNombre.setAttribute("value", previousData.nombre)
    inputNombre.setAttribute("type","text")
    inputNombre.setAttribute("name", "nombre")

    inputEdad.setAttribute("value", previousData.edad)
    inputEdad.setAttribute("type","text")
    inputEdad.setAttribute("name", "edad")
    
    inputIdCurso.setAttribute("value", previousData.idCurso)
    inputIdCurso.setAttribute("type","text")
    inputIdCurso.setAttribute("name", "idCurso")

    labelIdAl.innerText = "Id Alumno: " 
    labelNombre.innerText ="Nombre: "
    labelEdad.innerText = "Edad: "
    labelIdCuso.innerText = "Id Curso: "

    spanLabelInputIdAl.appendChild(labelIdAl)
    spanLabelInputIdAl.appendChild(inputIdAl)

    spanLabelInputNombre.appendChild(labelNombre)
    spanLabelInputNombre.appendChild(inputNombre)

    spanLabelInputEdad.appendChild(labelEdad)
    spanLabelInputEdad.appendChild(inputEdad)

    spanLabelInputIdCurso.appendChild(labelIdCuso)
    spanLabelInputIdCurso.appendChild(inputIdCurso)
    
    let inputSubmit = document.createElement("input")
    inputSubmit.setAttribute("type", "submit")
    inputSubmit.setAttribute("id", "submitEditable")
    formNuevo.appendChild(spanLabelInputIdAl)
    formNuevo.appendChild(spanLabelInputNombre)
    formNuevo.appendChild(spanLabelInputEdad)
    formNuevo.appendChild(spanLabelInputIdCurso)
    formNuevo.appendChild(inputSubmit)

    div.appendChild(formNuevo)
}

function fetchApi (){
    fetch("http://127.0.0.1:3001")
        .then(response => response.json())
        .then(response => crearAlumnos(response))

}
function fetchInsert(data){
    fetch("http://127.0.0.1:3001/insertUser", {
        headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-Type": "application/json",
        },
        method: "POST",
        body:JSON.stringify( {
            nombre: `${data["nombre"]}`,
            edad: `${data["edad"]}`,
            id_al: `${data["idAl"]}`,
            id_curso: `${data["idCurso"]}` 
        })
    })
    .then(response =>response.json())
    .then(res => comprobarRespuesta(res))

    setTimeout(fetchApi, 100)
}
function fetchDelete(idAl){
    fetch("http://127.0.0.1:3001/deleteUser", {
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-Type": "application/json",
            },
            method: "POST",
            body:JSON.stringify( {
                id_al: `${idAl}`,
            })
        })
}

function fetchUpdateUser(data){
    console.log(data)
    fetch("http://127.0.0.1:3001/update",{
        headers: {
            "Access-Control-Allow-Origin" : "*",
            "Content-Type": "application/json",
        },
        method: "POST",
        body:JSON.stringify( {
            id_al: `${data.idAl}`,
            nombre: `${data.nombre}`,
            edad: `${data.edad}`,
            idCurso: `${data.idCurso}`
        }) 
    })
}

function comprobarRespuesta(res){
    if(res.status){
        let divForm = document.getElementById("formContainer")
        let labelError = document.createElement("label")
        labelError.setAttribute("id", "labelErrores")
        labelError.innerText = `${res.status}`
        divForm.appendChild(labelError)
    }
}


