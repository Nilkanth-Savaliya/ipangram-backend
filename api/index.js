const mainRouter = require('express').Router();
const { v1Router } = require('./v1/routes');

mainRouter.use('/v1', v1Router);

module.exports = mainRouter;
