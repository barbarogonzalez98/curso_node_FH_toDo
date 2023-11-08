const fs = require('node:fs');
//const { listarTareas } = require("../models/tareas");

const archivo = `./db/Tareas.json`;
 
    const guardarDB = (data) =>{
        fs.writeFileSync(archivo, JSON.stringify(data));
    }

    const leerDB = ()=>{
        if(!archivo){
            return null;
        }
        const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
        const data = JSON.parse(info);
        return data;
    }

module.exports={
    guardarDB,
    leerDB,
}
