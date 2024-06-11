import {db} from "./firebase.js"
import {addDoc,collection,getDocs,doc,updateDoc,deleteDoc} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


export const registrar_mascota= async(mascota)=>{
    const docref = await addDoc(collection(db,"mascotas"), mascota)
}

export const obtener_datos = async()=>{
    let ref = collection(db,"mascotas")

    let qSnap = await getDocs(ref)
    let lista = []

    qSnap.forEach((i) => {
        lista.push({...i.data(),id:i.id})
    });
    return lista
}
export const actualizar =async(objeto,id)=>{
    ref = collection(db,"mascotas",id)
    await updateDoc(ref,objeto)
}
export const Eliminar =async(id)=>{
    ref = collection(db,"mascotas",id)
    await updateDoc(ref)
}