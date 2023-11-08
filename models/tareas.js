const Tarea = require('./tarea');
require('colors');

/**
 * _listado:
 *  {'uuid-1234213-123123-2:{id:12, desc:asdsd, completadosEn: true}}
 */

class Tareas {

    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key=>{
            listado.push(this._listado[key])
        });
        return listado;
    }
    
    constructor () {
        this._listado = {};
    }

    //Metodos de la clase
    cargarTareasFromDB(data=[]){
        data.forEach(tarea=>{
            this._listado[tarea.id] = tarea;
        })
    }
    crearTarea(descripcion=''){
        const tarea = new Tarea (descripcion);
        this._listado[tarea.id] = tarea;
    }
    listarTodasLasTareas(){
        listarTareas(this.listadoArr);
    }
    listarTareasCompletadas(completada=true){
        console.log('\n');
        let i = 1;
        this.listadoArr.forEach(tarea=>{
            const index = `${i+1}.`.green;
            const {descripcion, completadosEn} = tarea;
            const estado = (completadosEn)
             ?'Completado'.green
             :'Pendiente'.red;

            if(completada===true){
                if(completadosEn){
                    console.log(`${index} ${descripcion} :: ${estado}`); 
                }
            }else{
                if(!completadosEn){
                     console.log(`${index} ${descripcion} :: ${estado}`); 
                }
            }        
        });
    }
    // listarTareasCompletadas(){
    //     const Completadas = this.listadoArr.filter(tarea=>tarea.completadosEn!==null);
    //     listarTareas(Completadas);
    // }
    // listarTareasPendientes(){
    //     const Pendientes = this.listadoArr.filter(tarea=>tarea.completadosEn===null);
    //     listarTareas(Pendientes);
    // }
}

function listarTareas(lista) {
    console.log('\n');
    lista.forEach((tarea, i) => {
        const index = `${i + 1}.`.green;
        const { descripcion, completadosEn } = tarea;
        const estado = (completadosEn)
            ? 'Completado'.green
            : 'Pendiente'.red;
        console.log(`${index} ${descripcion} :: ${estado}`);
    });
}

module.exports = Tareas;