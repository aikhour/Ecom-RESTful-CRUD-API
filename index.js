require('dotenv').config({ quiet: true});

const express = require('express');
const app = express();

const { PORT } = require('./config');

async function startServer() {
    try {

        // Start server
        app.listen(PORT, () => {
            console.log(`Server listening on PORT ${PORT}`);
        })

    } catch(error) {
        console.log(error);
    }
};

startServer();