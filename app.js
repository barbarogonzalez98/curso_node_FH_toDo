const { guardarDB, leerDB } = require('./helpers/guardar-archivo.js');
const { inquirerMenu, pausa, leerInput, eliminarTareaMenu, confirmar, marcarCompletadoMenu } = require('./helpers/inquirer.js');
const Tareas = require('./models/tareas.js');

console.clear();

const main = async() =>{
let opt = '';
//Crear arreglo de tareas
const tareas = new Tareas();
//Cargar DB de tareas si existen
const tareasDB = leerDB();

if(tareasDB){
    tareas.cargarTareasFromDB(tareasDB);
} 
    

do {
    //Esta funcion imprime el menu
    opt = await inquirerMenu(); 
    
    switch (opt) {
        case '1':
                //Crear tarea
                const descripcion = await leerInput('Descripción de la nueva tarea: ');
                tareas.crearTarea(descripcion);
            break;
        case '2':
                //Listar tareas
                tareas.listarTareas();
            break;
        case '3':
                //Listar tareas completadas
                tareas.listarTareasCompletadas(true);
            break;
        case '4':
                //Listar tareas pendientes
                tareas.listarTareasCompletadas(false);
            break;
        case '5':
                //Marcar una tarea como pendiente o no
                    const ids = await marcarCompletadoMenu(tareas.listadoArr);
                    tareas.toggleTareaCompletada(ids);
            break;
        case '6':
                //Eliminar Tarea
                const id = await eliminarTareaMenu(tareas.listadoArr);
                if(id==='0')break
                const message = `\n¿Confirma borrar esta tarea?`;
                if(await confirmar(message)){
                    tareas.eliminarTarea(id);
                }
            break;
    }

    guardarDB(tareas.listadoArr); 
    
    if(opt!=='0') await pausa();

} while (opt !== '0');    
}

main();