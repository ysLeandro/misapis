import {Router}from 'express';
import {
    getAllEjemplos,
    getEjemplosById,
    postEjemplo,
    putEjemplo,
    deleteEjemplo
} from '../controllers/ejemplo.controller.js';
const ejemplo = Router();

ejemplo.get('/', getAllEjemplos);

ejemplo.get('/:id', getEjemplosById);

ejemplo.put('/:id',putEjemplo);

ejemplo.post('/', postEjemplo);

ejemplo.delete('/:id',deleteEjemplo);

export default ejemplo;