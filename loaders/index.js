const routeLoader = require('../routes');

module.exports = async (app) => {

    // Load API route handlers
    await routeLoader(app);


    // Loader error handler
    app.use((err, req, res, next) => {
        const { message, status } = err;
        
        return res.status(status).send({message});
    })
}