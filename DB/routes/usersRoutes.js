const express = require("express");
const router = express.Router();
const controller = require('../controllers/usersController')
const cors = require('cors'); 
router.use(cors());

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
    res.send(await controller.getByQuery(req.query));
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await controller.getById(id);
    res.send(user)
});

router.post("/", async(req, res) => {
    const response=await controller.create(req.body.username, req.body.password)
    console.log("insertId",response)
    res.send(await controller.getById(response));
});

router.put("/:id", async (req, res) => {
    const id = req.params.id; 
    console.log("id",id)
    const response = await controller.update(id, req.body.name, req.body.email, req.body.street, req.body.city, req.body.phone);
    res.send(response);
});


router.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const response=await controller.deleteUser(id);
    res.send();
});

module.exports = router

