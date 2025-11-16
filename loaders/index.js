const routeLoader = require('../routes');
const expressLoader = require('./express');
const passportLoader = require('./passport');
const swaggerLoader = require('./swagger');
const swagger = require('./swagger');

module.exports = async (app) => {

    // Load express middlewares
    const expressApp = await expressLoader(app);

    // load passport middleware
    const passport = await passportLoader(expressApp);

    // Load API route handlers
    await routeLoader(app, passport);

    // load swagger
    await swaggerLoader(app);

    // Loader error handler
    app.use((err, req, res, next) => {

        const { message, status } = err;
    
    return res.status(status || 500).send(message);
    });
}