import { Router } from 'express';
import {
    getAllSpiders,
    getSpiderById,
    postSpider,
    putSpider,
    deleteSpider
} from '../controllers/spider.controller.js';

const spider = Router();

spider.get('/', getAllSpiders);
spider.get('/:id', getSpiderById);
spider.post('/', postSpider);
spider.put('/:id', putSpider);
spider.delete('/:id', deleteSpider);

export default spider;