const routes = require('express').Router();
const controller = require('./controller');



routes.get('/',controller.getAll);
routes.post('/',controller.createOne);
routes.get('/:id',controller.getOne);
routes.delete('/:id',controller.deleteOne);
routes.put('/:id',controller.updateOne);
module.exports = routes;