const swaggerJSDoc = require('swagger-jsdoc');

module.exports = (app) => {

    // swagger definition
    var swaggerDefinition = {
        info: {
            title: 'Node RESTful Ecom API',
            version: '1.0.0',
            description: 'Applies CRUD operations to a PostgreSQL server via HTTP methods',
        },
        host: 'localhost:3000',
        basePath: '/',
    };

    // options for the swagger docs
    var options = {
        // import swaggerDefinitions
        swaggerDefinition: swaggerDefinition,
        // path to the API docs
        apis: ['./routes/*.js'],
    };

    var swaggerSpec = swaggerJSDoc(options);

    // serve swagger
    app.get('/swagger.json', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}