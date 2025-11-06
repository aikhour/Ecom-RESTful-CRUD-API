const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = (app) => {

    // enable cross origin resource sharing to all origins by default
    app.use(cors());

    // transforms raw string of req.body into json
    app.use(bodyParser.json());

    // parses urlencoded bodies
    app.use(bodyParser.urlencoded({ extended: true }));



    return app;
}