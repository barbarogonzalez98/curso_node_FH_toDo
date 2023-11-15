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
    //Cargar tareas de la DB
    cargarTareasFromDB(data=[]){
        data.forEach(tarea=>{
            this._listado[tarea.id] = tarea;
        })
    }
    //Crear una nueva tarea
    crearTarea(descripcion=''){
        const tarea = new Tarea (descripcion);
        this._listado[tarea.id] = tarea;
    }
    //Listar tareas
    listarTareas(){
        console.log('\n');
        this.listadoArr.forEach((tarea, i) => {
        const index = `${i + 1}.`.green;
        const { descripcion, completadosEn } = tarea;
        const estado = (completadosEn)
            ? 'Completado'.green
            : 'Pendiente'.red;
        console.log(`${index} ${descripcion} :: ${estado}`);
        });
    }
    //Listar tareas completadas || o no...
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
                    console.log(`${index} ${descripcion} :: ${completadosEn.green}`); 
                }
            }else{
                if(!completadosEn){
                     console.log(`${index} ${descripcion} :: ${estado}`); 
                }
            }        
        });
    }
    //Marcar tareas como completadas o no
    /**
     * 
     * @param {[id: Tarea]} ids 
     */
    toggleTareaCompletada(ids=[]){
        ids.forEach(id=>{
            if(!this._listado[id].completadosEn){
                this._listado[id].completadosEn = new Date().toISOString();
            }
        });
        this.listadoArr.forEach(tarea=>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadosEn = null;
            }
        });
    }

    //Eliminar tarea
    async eliminarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }
}

module.exports = Tareas;