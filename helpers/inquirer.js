const  inquirer  = require('inquirer');
const Tarea = require('../models/tarea');
require('colors');


//Menu y Pausa
const preguntas = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },{
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },{
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },{
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },{
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },{
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },{
                value: '0',
                name: `${'0.'.green} Salir\n`
            }
        ],
    }
]
const inquirerMenu = async ()=>{
    console.clear();
    console.log('==============================='.green);
    console.log('   Seleccione una opcion:     '.white);
    console.log('===============================\n'.green);

    const {option} = await inquirer.prompt(preguntas);
    return option;
}
const pausa = async () =>  {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPress ${'ENTER'.green} to continue\n`,
        }
    ]
    console.log('\n');
     await inquirer.prompt(question);
 }
//Entrar una nueva tarea
 const leerInput = async (message)=>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length===0){
                    return 'Debe ingresar un valor';
                }
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(question);
    return desc;
}
//Eliminar tarea y confirmar
/**
 * 
 * @param {[Tarea]} listado 
 */
const eliminarTareaMenu = async listado=>{
    const choices = listado. map((tarea, i)=>{
        const index = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${index} ${tarea.descripcion}`,
        }
    })
    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar',
    });
    const preguntas = [
        {
            type: 'list',
            name: 'option',
            message: '¿Que tarea desea borrar?',
            choices
        }
    ]
    console.log('\n');
    const {option} = await inquirer.prompt(preguntas);
    return option;
}
const confirmar = async (message) =>  {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        }
    ]
    console.log('\n');
     const {ok} = await inquirer.prompt(question);
     return ok;
 }
//Marcar como completado 
/**
 * 
 * @param {[Tarea]} listado 
 */
const marcarCompletadoMenu = async listado=>{
    const choices = listado. map((tarea, i)=>{
        const estado = (tarea.completadosEn)
        ?'Completado'.green
        :'Pendiente'.red;
        const index = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${index} ${tarea.descripcion} ${estado}`,
            checked: (tarea.completadosEn)? true : false,
        }
    })
    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: '¿Que tarea desea completar?',
            choices
        }
    ]
    console.log('\n');
    const {ids} = await inquirer.prompt(preguntas);
    return ids;
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    eliminarTareaMenu,
    confirmar,
    marcarCompletadoMenu,
}