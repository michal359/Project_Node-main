const express = require("express");
const router = express.Router();
const controller = require('../controllers/usersController')
const cors = require('cors');
router.use(cors());

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
    try {
        res.send(await controller.getByQuery(req.query));
    } catch (err) {
        res.status(500).send(err);
    }
})

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await controller.getById(id);
        res.send(user)
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const response = await controller.create(req.body.username, req.body.password)
        res.send(await controller.getById(response));
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await controller.update(id, req.body.name, req.body.email, req.body.street, req.body.city, req.body.phone);
        res.send(response);
    } catch (err) {
        res.status(500).send(err);
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await controller.deleteUser(id);
        res.send();
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router

