const userRouter = require('./users');

module.exports = (app) => {
    userRouter(app);
}


