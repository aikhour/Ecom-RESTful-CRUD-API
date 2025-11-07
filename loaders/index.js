const routeLoader = require('../routes');
const expressLoader = require('./express');

module.exports = async (app) => {

    // Load express middlewares
    const expressApp = await expressLoader(app);

    // Load API route handlers
    await routeLoader(app);


    // Loader error handler
    app.use((err, req, res, next) => {

        const { message, status } = err;
    
    return res.status(status || 500).send(message);
    });
}