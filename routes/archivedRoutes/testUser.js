const user =
{
    "id": 1,
    "username": "duck1",
    "password": "duck",
    "email": "duck@memm.com"
}

const cart = 
{
    "product_id": 1,
    "quantity": 2
}


// test route
    router.get('/a', async (req, res, next) => {
        try {
            const response = await DBH.idMaker('cart_table');

            // success
            res.status(200).send(response);

        } catch(error) {
            next(error);
        }
    });