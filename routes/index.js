const userRouter = require('./users');
const productRouter = require('./products');

module.exports = (app) => {
    userRouter(app);
    productRouter(app);
}


