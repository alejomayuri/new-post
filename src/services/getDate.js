export default function getDate () {

    const date = new Date()
    const dia = date.getDate()
    const mes = date.getMonth()
    const year = date.getFullYear()
    let mesCorrecto = mes > 9 ? mes + 1 : `0${mes + 1}`
    let fechaCreado = dia + '/' + mesCorrecto + '/' + year

    return fechaCreado
}