import { registrar_mascota,obtener_datos, Eliminar, actualizar } from "./promesa.js"

window.addEventListener("load",()=>{
    document.getElementById("btnRegistrar").addEventListener("click",registrar)
    cargar_datos()
})


const registrar = ()=>{
    let nTipo = document.querySelector("input[name='tipo']:checked")
    let nSintomas = document.getElementById("sintomas")
    let nProblemas = document.getElementById("problemas")
    let nNombre = document.getElementById("nombre")
    let nMascota = document.getElementById("nombre_mascota")

    let vTipo = nTipo.value
    let vSintomas = nSintomas.value
    let vProblemas = nProblemas.value
    let vNombre = nNombre.value
    let vMascota = nMascota.value

    let objeto ={Tipo:vTipo,Sintomas:vSintomas,Problemas:vProblemas,Nombre:vNombre,Nombre_mascota:vMascota}
    registrar_mascota(objeto).then(()=>{
        alert("se registro con exito")
    }).catch((error)=>{
        console.log(error)
    })
}

const cargar_datos = ()=>{
    obtener_datos().then((mascotas)=>{
        console.log(mascotas)

        let tabla = ""
        mascotas.forEach((p)=>{
            tabla += "<tr>"
            tabla += "<td>"+p.Tipo+"<td>"
            tabla += "<td>"+p.Sintomas+"<td>"
            tabla += "<td>"+p.Problemas+"<td>"
            tabla += "<td>"+p.Nombre+"<td>"
            tabla += "<td>"+p.Nombre_mascota+"<td>"
            tabla += "<td><button id='UPD"+p.id+"'>Actualizar</button></td>"
            tabla += "<td><button id='DEL"+p.id+"'>Eliminar</button></td>"
        })
        document.getElementById("CuerpoTabla").innerHTML = tabla
        mascotas.forEach((j)=>{
            let elemento = document.getElementById("UPD"+j.id)
            elemento.addEventListener("click",()=>{
                document.getElementById("UPDsintomas").value = j.Sintomas
                document.getElementById("UPDproblemas").value = j.Problemas
                document.getElementById("UPDnombre").value = j.Nombre
                document.getElementById("UPDnombre_mascota").value = j.Nombre_mascota
            })
            let btnEliminar = document.getElementById("DEL"+j.id)
            btnEliminar.addEventListener("click",()=>{
                if (confirm("Desea Eliminar a:\n"+j.Nombre)){
                console.log("vamos a elminar")
                Eliminar(j.id).then(()=>{
                    alert("Eliminaste con exito")
                    cargar_datos()
                }).catch((e)=>{
                    console.log(e)
                })
                }
                else{
                console.log("Cancelaste la eliminacion")
                }
        })
        })

    })
}

const actualizar_mascota = ()=>{
    let nTipo = document.querySelector("input[name='tipo']:checked")
    let nSintomas = document.getElementById("UPDsintomas")
    let nProblemas = document.getElementById("UPDproblemas")
    let nNombre = document.getElementById("UPDnombre")
    let nMascota = document.getElementById("UPDnombre_mascota")

    let vTipo = nTipo.value
    let vSintomas = nSintomas.value
    let vProblemas = nProblemas.value
    let vNombre = nNombre.value
    let vMascota = nMascota.value

    let id = document.getElementById("btnActualizar").value
    let objeto ={Tipo:vTipo,Sintomas:vSintomas,Problemas:vProblemas,Nombre:vNombre,Nombre_mascota:vMascota}
    actualizar(objeto,id).then(()=>{
        alert("se actualiza con exito")
        cargar_datos()
    })
}