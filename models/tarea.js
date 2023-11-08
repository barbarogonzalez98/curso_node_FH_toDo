const {v4: uuidv4} = require('uuid');

class Tarea {
    id = '';
    descripcion = '';
    completadosEn = null;

    constructor(descripcion=''){
        this.id = uuidv4();
        this.descripcion = descripcion;
        this.completadosEn = null;
    }
}

module.exports = Tarea;