const router = require('express').Router();
const Connection = require('../models/ConnectionModel');

router.post('/create', async(req, res)=>{
    const {user_id} = req.body;

    const newConnection = new Connection({
        user_id
    })
    try {
        await newConnection.save();
        res.status(201);
    } catch (error) {
        res.status(400);
    }
})

router.get('/', async(req, res)=>{
    try {
        const totalConnections = await Connection.find();
        res.send({totalConnections: totalConnections.length});
    } catch (error) {
        res.status(400)
    }
})

module.exports = router;