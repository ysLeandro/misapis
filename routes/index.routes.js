import ejemplo from  './ejemplo.routes.js';
import spider from './spider.routes.js';
import {Router} from  'express';

const indexRoutes= Router();

indexRoutes.use('/ejemplo',ejemplo);
indexRoutes.use('/spiders',spider);

export default indexRoutes;
