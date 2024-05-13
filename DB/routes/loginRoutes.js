const express = require("express");
const router = express.Router();
const controller = require('../controllers/usersController')
const cors = require('cors'); 
router.use(cors());

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.post("/", async(req, res) => {
    try{
        const response=await controller.login(req.body.username,req.body.password)
        console.log("username: ", req.body.username)
        console.log("password: ", req.body.password)
        console.log("response:", response);
        res.send(await controller.getById(response.id))
    } catch(err){
        res.status(404).send('User not found');
    }
   
});

module.exports = router
