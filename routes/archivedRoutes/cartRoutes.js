/** GET get cart from id
     * @params {Object} data [cart id]
     * @returns {Object|null} [cart Record]
     */
    router.get('/:cartId', async (req, res, next) => {

        try {
            // cartid from params
            const { cartId } = req.params;

            // response from service call
            const response = await CartServiceInstance.getCartById({ id: cartId });
            // success + return the object
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }
    });
    
    /**
     * GET get all carts
     * @return {Object|null} [First 10 cart records]
     */
    
    router.get('/', async (req, res, next) => {

        try {
            // response from service call
            const response = await CartServiceInstance.getAllCarts()
            // success + return the object
            res.status(200).send(response);
        } catch(error) {
            next(error);
        }
    })
    


    /**
     * PUT update cart using req params
     * @params {Object} data [cart New Data]
     * @returns {Object|null} [cart Record]
     */
    
    router.put('/:cartId', async (req, res, next) => {
        

        try {
            // get cartId and data
            const { cartId } = req.params;
            const data = req.body;

            // response from service call
            const response = await CartServiceInstance.updateCart({ id: cartId, ...data});
            // success
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }

    })
    // PUT on /cart route
    router.put('/', async (req, res, next) => {
        

        try {
            // get cartId and data
            const data = req.body;
            const cartId = data.id;

            // response from service call
            const response = await CartServiceInstance.updateCart({ id: cartId, ...data});
            // success
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }

    })

    /**
     * DELETE delete cartt by id
     * @params {Integer} id [cart id]
     * @return {Object|null} [Confirmation of deletion]
     */
    router.delete('/:cartId', async (req, res, next) => {
        try {
            // get cartId
            const { cartId } = req.params;

            // response from delete call
            const response = await CartServiceInstance.deleteCart({ id: cartId });
            // success
            res.status(200).send(`Cart deleted`);
        } catch(error) {
            next(error);
        }
    })
    // delete user on /carts route
    router.delete('/', async (req, res, next) => {
        try {
            // get cartId
            const data = req.body;
            const cartId =  data.id;

            // response from delete call
            const response = await CartServiceInstance.deleteCart({ id: cartId });
            // success
            res.status(200).send(`Cart deleted`);
        } catch(error) {
            next(error);
        }
    })

    // creating cart records


    /**
     * POST create cart
     * @params {Object} data [New cart Data]
     * @returns {Object|null} [New cart Record]
     */
    router.post('/', async (req, res, next) => {
        try {
            // get data
            const data = req.body;

            // response from service call
            const response = await CartServiceInstance.createCart(data);

            // success
            res.status(201).send(response);

        } catch(error) {
            next(error);
        }
    })

    