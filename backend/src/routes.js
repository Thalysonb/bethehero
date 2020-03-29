const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileControle');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.post('/ongs', OngController.create);
routes.get('/ongs', OngController.listAll)

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.listAll);
routes.delete('/incidents/:id', IncidentController.deleteById);

routes.get('/profile', ProfileController.listAllIncidentsByOngId);
module.exports = routes;